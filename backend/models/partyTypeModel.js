const mongoose = require('mongoose');

const partyTypeSchema = mongoose.Schema(
    {
        name: {
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

module.exports = mongoose.model('partyTypes', partyTypeSchema);