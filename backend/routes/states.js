const express = require('express');
const { states } = require('../controllers/stateController');

const router = express.Router();

router.route('/')
    .get(states)
// .post(saveDesignation);

router.route('/:_id')
    .get((req, res) => {
        res.status(200).json({ message: `Get Designation for ${req.params.id}` });
    })
// .put(updateDesignation)
// .delete(deleteDesignation)

module.exports = router;