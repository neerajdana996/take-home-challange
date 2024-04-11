const router = require('express').Router();
const contractController = require('../controllers/contractController');

router.get('/', contractController.GetContracts);
router.get('/:id', contractController.GetContractById);

module.exports = router;