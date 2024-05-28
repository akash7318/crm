const User = require('../models/userModel');
const Designation = require('../models/designationModel');
const State = require('../models/stateModel');

const { logError } = require('../middlewares');
const passwordHash = require('password-hash');

const users = async (req, res) => {
    try {
        const users = await User.find({ designation: { $ne: 'Super Admin' } }, { createdAt: 0, updatedAt: 0, __v: 0, hashPassword: 0, password: 0, stateId: 0 });
        let data = [];
        if (users) {
            for (const user of users) {
                const designation = await Designation.findOne({ _id: user.designationId });
                data.push({
                    _id: user._id,
                    name: user.name,
                    designation: designation.designation,
                    joiningDate: user.joiningDate,
                });
            }
            res.status(200).json({ status: true, message: "", data: data });
        } else {
            res.status(200).json({ status: false, message: "Data not available..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const userById = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params._id }, { createdAt: 0, updatedAt: 0, __v: 0, hashPassword: 0, password: 0, });
        if (user) {
            const designation = await Designation.findOne({ _id: user.designationId });
            const state = await State.findOne({ _id: user.stateId });
            user = { user, designation, state }
            res.status(200).json({ status: true, message: "", data: user });
        } else {
            res.status(200).json({ status: false, message: "Data not available..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const saveUser = async (req, res) => {
    try {

        const username = req.body.personalEmailId.split('@')[0];
        const hashPassword = passwordHash.generate(req.body.password);
        const dob = req.body.dob.split("-").reverse().join("-");
        const joiningDate = req.body.joiningDate.split("-").reverse().join("-");

        const data = {
            name: req.body.name,
            personalEmailId: req.body.personalEmailId,
            workEmailId: req.body.workEmailId,
            personalMobileNo: parseInt(req.body.personalMobileNo),
            workMobileNo: parseInt(req.body.workMobileNo),
            username: username,
            password: req.body.password,
            hashPassword: hashPassword,
            dob: dob,
            joiningDate: joiningDate,
            designationId: req.body.designationId,
            stateId: req.body.stateId,
            zipCode: parseInt(req.body.zipCode),
            address: req.body.address,
        }

        let user = await new User(data);
        user = await user.save();
        if (user) {
            res.status(201).json({ status: true, message: "Saved Successfully!", });
        } else {
            res.status(200).json({ status: false, message: "Something Unusual..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const updateUser = async (req, res) => {
    try {
        let user = await User.updateOne(
            { _id: req.params._id },
            {
                $set: req.body,
            }
        );
        if (user) {
            res.status(201).json({ status: true, message: "", });
        } else {
            res.status(200).json({ status: false, message: "Something Unusual..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params._id });
        if (user) {
            res.status(202).json({ status: true, message: "", });
        } else {
            res.status(200).json({ status: false, message: "Something Unusual..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

module.exports = { users, userById, saveUser, updateUser, deleteUser }