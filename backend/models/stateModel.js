const mongoose = require('mongoose');

const stateSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
    }
);

module.exports = mongoose.model('states', stateSchema);