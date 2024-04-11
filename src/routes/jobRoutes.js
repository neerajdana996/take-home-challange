const router = require('express').Router();
const jobController = require('../controllers/jobController');
const isValidClient = require('../middleware/isUserClient');

router.get('/unpaid', jobController.GetUnpaidJobs);
router.post('/:job_id/pay', isValidClient, jobController.InitiateJobPayment);
module.exports = router;