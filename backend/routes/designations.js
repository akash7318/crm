const express = require('express');
const { designations, saveDesignation, deleteDesignation, updateDesignation } = require('../controllers/designationController');

const router = express.Router();

router.route('/')
    .get(designations)
    .post(saveDesignation);

router.route('/:_id')
    // .get((req, res) => {
    //     res.status(200).json({ message: `Get Designation for ${req.params.id}` });
    // })
    .put(updateDesignation)
    .delete(deleteDesignation)

module.exports = router;