const express = require('express');
const router = express.Router()
const {verify} = require("../middleware/authMiddleWare")

const {userReg, loginUser, allUser} = require("../controller/userController")




router.route("/").post(userReg)
router.route("/login").post(loginUser)
router.route("/").get(verify, allUser)

module.exports = router