const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

//works well
router.post('/signup', userController.userPostSignup)

//works well
router.post('/login', userController.userPostLogin)

//works well
router.delete('/:userId', userController.userDelete)

module.exports = router;
