const Designation = require('../models/designationModel');
const { logError } = require('../middlewares');

const designations = async (req, res) => {
    try {
        const designations = await Designation.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
        if (designations) {
            res.status(200).json({ status: true, message: "", data: designations });
        } else {
            res.status(200).json({ status: false, message: "Data not available..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const saveDesignation = async (req, res) => {
    try {
        let designation = await new Designation({ designation: req.body.designation });
        designation = await designation.save();
        if (designation) {
            res.status(201).json({ status: true, message: "", data: { _id: designation._id, designation: designation.designation } });
        } else {
            res.status(200).json({ status: false, message: "Something Unusual..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const updateDesignation = async (req, res) => {
    try {
        let designation = await Designation.updateOne(
            { _id: req.params._id },
            {
                $set: { designation: req.body.designation },
            }
        );
        if (designation) {
            res.status(201).json({ status: true, message: "", });
        } else {
            res.status(200).json({ status: false, message: "Something Unusual..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const deleteDesignation = async (req, res) => {
    try {
        const designation = await Designation.deleteOne({ _id: req.params._id });
        if (designation) {
            res.status(202).json({ status: true, message: "", });
        } else {
            res.status(200).json({ status: false, message: "Something Unusual..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

module.exports = { designations, saveDesignation, deleteDesignation, updateDesignation }