const router = require('express').Router();
const balanceController = require('../controllers/balanceController');

router.post('/deposit/:amount', balanceController.DepositMoneyByUserID);
module.exports = router;