const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.get('/best-profession', adminController.GetBestProfession);
router.get('/best-clients', adminController.GetBestClients);

module.exports = router;