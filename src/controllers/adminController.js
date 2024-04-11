

const initiateJobPayment = require('../services/job/initiateJobPayment');
const { getBestProfession } = require('../services/admin/getBestProfession');
const { getBestClients } = require('../services/admin/getBestClient');



const GetBestProfession = async (req, res) => {
    try {
        const { start, end } = req.query;

        const response = await getBestProfession(start, end);
        if (response.message) {
            return res.status(400).json(response);
        }
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const GetBestClients = async (req, res) => {
    try {
        const { profile } = req;
        const { start, end, limit } = req.query;
        const response = await getBestClients(start, end, limit);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    GetBestProfession,
    GetBestClients
};