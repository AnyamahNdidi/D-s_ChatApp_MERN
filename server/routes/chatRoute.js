const express = require('express');
const router = express.Router()
const {verify} = require("../middleware/authMiddleWare")

const {accessChat } = require("../controller/chatController")

router.route("/").post(verify, accessChat)

module.exports = router