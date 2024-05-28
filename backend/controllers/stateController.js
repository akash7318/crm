const State = require('../models/stateModel');
const { logError } = require('../middlewares');

const states = async (req, res) => {
    try {
        const states = await State.find({});
        if (states) {
            res.status(200).json({ status: true, message: "", data: states });
        } else {
            res.status(200).json({ status: false, message: "Date not available..." });
        }
    } catch (error) {
        logError(error, req.originalUrl);
    }
}

module.exports = { states }