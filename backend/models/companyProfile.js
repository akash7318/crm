const mongoose = require('mongoose');

const companyProfileSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        clientName: {
            type: String,
            required: true
        },
        primaryEmailId: {
            type: String,
            required: true,
        },
        secondaryEmailId: {
            type: String,
        },
        primaryMobileNo: {
            type: Number,
            required: true,
        },
        secondaryMobileNo: {
            type: Number,
        },
        gstNo: {
            type: String,
        },
        pinCode: {
            type: String,
        },
        stateId: {
            type: String,
            required: true,
        },
        websiteURL: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        partyTypeId: {
            type: String,
        },
        shiftTo: {
            type: String,
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('companyProfiles', companyProfileSchema);