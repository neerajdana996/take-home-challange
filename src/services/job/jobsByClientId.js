const { Op } = require("sequelize");
const { Job, Contract } = require("../../model");

async function getJobsByClientId(ClientId) {

    const activeClientContracts = await Contract.findAll({
        where: { ClientId },
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
        },
    });

    if (jobs.length === 0)
        return { message: "No  jobs" };

    return jobs;

};

module.exports = getJobsByClientId;