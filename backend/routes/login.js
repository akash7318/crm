const express = require('express');

const router = express.Router();

const { login } = require('../controllers/loginController');

// router.route('/').get((req, res) => {
//     res.status(200).json({ message: 'All Users' });
// });

// router.route('/:id').get((req, res) => {
//     res.status(200).json({ message: `Get User for ${req.params.id}` });
// });

router.post('/', login);

// router.route('/:id').put((req, res) => {
//     res.status(200).json({ message: `Update User for ${req.params.id}` });
// });

// router.route('/:id').delete((req, res) => {
//     res.status(200).json({ message: `Delete User for ${req.params.id}` });
// });

module.exports = router;