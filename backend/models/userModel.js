const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        personalEmailId: {
            type: String,
            required: true,
            unique: true
        },
        workEmailId: {
            type: String,
        },
        personalMobileNo: {
            type: Number,
            required: true,
            unique: true
        },
        workMobileNo: {
            type: Number,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        hashPassword: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        joiningDate: {
            type: String,
            required: true,
        },
        designationId: {
            type: String,
            required: true,
        },
        stateId: {
            type: String,
            required: true,
        },
        zipCode: {
            type: Number,
        },
        address: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);