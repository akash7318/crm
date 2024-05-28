const express = require('express');
const { saveUser, updateUser, deleteUser, users, userById } = require('../controllers/userController')

const router = express.Router();

router.route('/')
    .get(users)
    .post(saveUser)

router.route('/:_id')
    .get(userById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;