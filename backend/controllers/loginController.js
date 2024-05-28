const User = require('../models/userModel');
const { logError } = require('../middlewares');
const passwordHash = require('password-hash');


const login = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username }, { hashPassword: 1 });
        if (user) {
            if (passwordHash.verify(req.body.password, user.hashPassword)) {
                user = await User.findOne({ username: req.body.username }, {
                    password: 0,
                    hashPassword: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                });
                res.status(202).json({ status: true, message: "Valide", data: user });
            } else {
                res.status(200).json({ status: false, message: "Invalid username or password" });
            }
        } else {
            res.status(200).json({ status: false, message: "Invalid username or password" });
        }
    } catch (error) {
        logError(error, req.originalUrl);
    }
}

module.exports = { login }