


const { Profile } = require("../../model");
const { getPaidJobsWithContract } = require("./getBestProfession");

async function getClientsByIds(clientIds) {
    return Profile.findAll({
        where: {
            id: clientIds
        }
    });

}
async function getBestClients(start, end, limit = 2) {
    const limitNumber = parseInt(limit, 10);
    if (isNaN(limitNumber) || limitNumber < 1) throw new Error("Limit should be a positive number");

    const paidJobs = await getPaidJobsWithContract(start, end);
    if (!paidJobs.length) return { message: "No paid jobs found for the specified period." };

    const clientIdToTotalPaid = paidJobs.reduce((acc, { Contract: { ClientId }, price }) => {
        acc[ClientId] = (acc[ClientId] || 0) + price;
        return acc;
    }, {});

    const sortedClientIds = Object.entries(clientIdToTotalPaid)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limitNumber)
        .map(([ClientId]) => ClientId);

    const clients = await getClientsByIds(sortedClientIds);

    return clients.map(client => ({
        ...client.toJSON(),
        paid: clientIdToTotalPaid[client.id],
    })).sort((a, b) => b.paid - a.paid);
}
module.exports = { getBestClients };