const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        companyProfileId: {
            type: String,
            required: true
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('comments', commentSchema);