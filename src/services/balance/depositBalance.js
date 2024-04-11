const { sequelize } = require('../../model')
const getUnpaidJobsAmount = require("../job/getUnPaidAmount");

async function depositBalance(money, profile) {
    const { total } = await getUnpaidJobsAmount(profile.id);
    if (total === 0) return { message: "No unpaid jobs" };
    const twentyFivePercent = total * 0.25;

    if (money > twentyFivePercent)
        return { message: "Deposit amount is greater than 25% of the total unpaid amount" };

    return sequelize.transaction(async (t) => {
        profile.balance += money;
        await profile.save({ transaction: t });
        return { message: "Deposit successful" };
    });

}

module.exports = depositBalance;