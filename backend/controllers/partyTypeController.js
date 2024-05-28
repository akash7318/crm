const PartyType = require('../models/partyTypeModel');
const { logError } = require('../middlewares');

const partyTypes = async (req, res) => {
    try {
        const partyTypes = await PartyType.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
        if (partyTypes) {
            res.status(200).json({ status: true, message: "", data: partyTypes });
        } else {
            res.status(200).json({ status: false, message: "Data not available..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const savePartyType = async (req, res) => {
    try {
        let partyType = await new PartyType({ name: req.body.name });
        partyType = await partyType.save();
        if (partyType) {
            res.status(201).json({ status: true, message: "", data: { _id: partyType._id, name: partyType.name } });
        } else {
            res.status(200).json({ status: false, message: "Something Unusual..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const updatePartyType = async (req, res) => {
    try {
        let partyType = await PartyType.updateOne(
            { _id: req.params._id },
            {
                $set: { name: req.body.name },
            }
        );
        if (partyType) {
            res.status(201).json({ status: true, message: "", });
        } else {
            res.status(200).json({ status: false, message: "Something Unusual..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

const deletePartyType = async (req, res) => {
    try {
        const partyType = await PartyType.deleteOne({ _id: req.params._id });
        if (partyType) {
            res.status(202).json({ status: true, message: "", });
        } else {
            res.status(200).json({ status: false, message: "Something Unusual..." });
        }
    } catch (error) {
        logError(error, req.method, req.originalUrl);
    }
}

module.exports = { partyTypes, savePartyType, deletePartyType, updatePartyType }