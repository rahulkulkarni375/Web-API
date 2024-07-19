//Base URL  :  localhost:5000/api/user  -> For user

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const validateToken = require('../middlewares/validateTokenHandler')

router.post("/register", userController.userRegistration)

router.post("/login", userController.userLogin)

router.get("/current", validateToken, userController.userCurrent)


module.exports = router ;
