const { Op } = require("sequelize");
const { Job, Contract } = require("../../model");

async function getUnpaidJobs(ClientId) {

    const activeClientContracts = await Contract.findAll({
        where: { ClientId, status: "in_progress" },
    });

    if (activeClientContracts.length === 0) {
        return { message: "No active contracts" };
    }

    const contractIds = activeClientContracts.map((contract) => contract.id);

    const jobs = await Job.findAll({
        where: {
            ContractId: {
                [Op.in]: contractIds,
            },
            [Op.or]: [{ paid: false }, { paid: null }],
        },
    });

    if (jobs.length === 0)
        return { message: "No unpaid jobs" };

    return jobs;

};

module.exports = getUnpaidJobs;