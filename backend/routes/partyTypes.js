const express = require('express');
const { partyTypes, savePartyType, deletePartyType, updatePartyType } = require('../controllers/partyTypeController');
// const { partyTypes, savePartyType } = require('../controllers/partyTypeController');

const router = express.Router();

router.route('/')
    .get(partyTypes)
    .post(savePartyType);

router.route('/:_id')
    // .get((req, res) => {
    //     res.status(200).json({ message: `Get PartyTypes for ${req.params.id}` });
    // })
    .put(updatePartyType)
    .delete(deletePartyType)

module.exports = router;