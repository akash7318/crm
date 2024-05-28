const mongoose = require('mongoose');

const designationSchema = mongoose.Schema(
    {
        designation: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('designations', designationSchema);