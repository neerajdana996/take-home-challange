

const { Op } = require("sequelize");
const { Job, Contract, Profile } = require("../../model");



async function getPaidJobsWithContract(start, end) {
    return Job.findAll({
        where: {
            paid: true,
            paymentDate: {
                [Op.between]: [start, end],
            },
        },
        include: [
            {
                model: Contract,
            },
        ],
    });
};
async function getMostPaidContractId(paidJobs) {
    let max = 0;
    let mostPaidContractId = null;
    paidJobs.reduce((acc, job) => {
        const {
            Contract: { ContractorId },
            price,
        } = job;

        if (!acc[ContractorId]) {
            acc[ContractorId] = 0;
        }
        acc[ContractorId] += price;

        if (acc[ContractorId] > max) {
            max = acc[ContractorId];
            mostPaidContractId = ContractorId;
        }

        return acc;
    }, {});

    return mostPaidContractId;
};


async function getBestProfession(start, end) {
    try {

        const paidJobs = await getPaidJobsWithContract(start, end);
        if (paidJobs.length === 0) {
            return { message: "No paid jobs" };
        }

        const mostPaidClient = await getMostPaidContractId(paidJobs);


        const profession = await Profile.findOne({
            where: { id: mostPaidClient, },
            attributes: ["profession"],
        });

        return profession;
    } catch (error) {
        return { message: error.message }
    }
};


module.exports = {
    getBestProfession,
    getPaidJobsWithContract
};