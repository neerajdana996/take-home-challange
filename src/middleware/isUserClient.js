async function isValidClient(req, res, next) {
    try {
        if (req.profile?.type !== "client")
            res.status(401).json({ message: "You are not authorized to perform this action" });
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = isValidClient