const { Op } = require("sequelize");
const { Job, Contract } = require("../../model");

async function getUnpaidJobsAmount(ClientId) {
    const activeContracts = await Contract.findAll({
        where: { ClientId, status: "in_progress" },
        attributes: ['id'],
    });

    if (activeContracts.length === 0) {
        return { message: "No active contracts", total: 0 };
    }

    const contractIds = activeContracts.map(contract => contract.id);

    const totalUnpaid = await Job.sum('price', {
        where: {
            ContractId: { [Op.in]: contractIds },
            [Op.or]: [{ paid: false }, { paid: null }],
        }
    });

    return { total: totalUnpaid || 0 };
};

module.exports = getUnpaidJobsAmount;