

const jobService = require('../services/job');




const GetUnpaidJobs = async (req, res) => {
    try {
        const { profile } = req;
        const { id } = profile;
        const response = await jobService.getUnpaidJob(id)
        if (response.message) {
            return res.status(404).json({ message: response.message });
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const InitiateJobPayment = async (req, res) => {
    try {

        const { job_id: jobId } = req.params;
        const { profile } = req;

        const response = await jobService.initiateJobPayment(jobId, profile);
        if (!response?.transactionId) {
            return res.status(404).json({ message: response.message });
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { GetUnpaidJobs, InitiateJobPayment };