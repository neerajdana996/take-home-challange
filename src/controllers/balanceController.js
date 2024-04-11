const depositBalance = require("../services/balance/depositBalance");

const DepositMoneyByUserID = async (req, res) => {
    const { money } = req.body;
    const { profile } = req;
    const response = await depositBalance(money, profile);
    res.json(response);
};

module.exports = { DepositMoneyByUserID };