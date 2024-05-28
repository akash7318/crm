const User = require('../models/userModel');
const CompanyProfile = require('../models/companyProfile');
const Comment = require('../models/comment');
const Designation = require('../models/designationModel');
const State = require('../models/stateModel');

const { logError } = require('../middlewares');

const companyProfiles = async (req, res) => {
    try {
        const companyProfiles = await CompanyProfile.find().sort({ createdAt: -1 });
        // const companyProfiles = await CompanyProfile.find().sort('-createdAt');
        let data = [];
        if (companyProfiles) {
            for (const companyProfile of companyProfiles) {
                const user = await User.findOne({ _id: companyProfile.userId });
                const shiftTo = await User.findOne({ designation: { $ne: "Super Admin" }, _id: companyProfile.shiftTo });
                const designation = await Designation.findOne({ _id: user.designationId });
                const shiftToDesignation = await Designation.findOne({ _id: shiftTo?.designationId });
                // const designation = shiftTo?.designationId
                data.push({
                    _id: companyProfile._id,
                    name: companyProfile.name,
                    clientName: companyProfile.clientName,
                    createdAt: companyProfile.createdAt,
                    userName: user.name,
                    designation: designation?.designation,
                    shiftToDesignation: shiftToDesignation?.designation,
                    shiftTo: shiftTo?.name,
                    primaryEmailId: companyProfile.primaryEmailId,
                    secondaryEmailId: companyProfile.secondaryEmailId,
                    primaryMobileNo: companyProfile.primaryMobileNo,
                    secondaryMobileNo: companyProfile.secondaryMobileNo,
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

const companyProfileById = async (req, res) => {
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

const saveCompanyProfile = async (req, res) => {
    try {
        const data = {
            userId: req.body.userId,
            name: req.body.name,
            clientName: req.body.clientName,
            primaryEmailId: req.body.primaryEmailId,
            secondaryEmailId: req.body.secondaryEmailId,
            primaryMobileNo: parseInt(req.body.primaryMobileNo),
            secondaryMobileNo: req.body.secondaryMobileNo !== '' ? parseInt(req.body.secondaryMobileNo) : null,
            gstNo: req.body.gstNo,
            pinCode: req.body.pinCode,
            stateId: req.body.stateId,
            websiteURL: req.body.websiteURL,
            address: req.body.address,
            partyTypeId: req.body.partyTypeId,
            shiftTo: req.body.shiftTo,
            comment: req.body.comment,
        }

        let companyProfile = await new CompanyProfile(data);
        companyProfile = await companyProfile.save();
        if (companyProfile) {
            const comments = { companyProfileId: companyProfile._id, comment: companyProfile.comment };
            const comment = await new Comment(comments);
            comment.save();
            res.status(201).json({ status: true, message: "Saved Successfully!" });
        } else {
            res.status(200).json({ status: false, message: "Something Unusual..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const updateCompanyProfile = async (req, res) => {
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

const deleteCompanyProfile = async (req, res) => {
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

module.exports = { companyProfiles, companyProfileById, saveCompanyProfile, updateCompanyProfile, deleteCompanyProfile }