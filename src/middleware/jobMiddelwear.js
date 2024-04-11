async function isValidClient(req, res, next) {
    try {
        const { profile } = req;

        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = isValidClient