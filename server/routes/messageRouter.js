const express = require('express');
const router = express.Router()
const { verify } = require("../middleware/authMiddleWare")


const {sendMessage,allMessage} = require("../controller/messageController")

router.route("/").post(verify, sendMessage)

router.route("/:chatId").get(verify, allMessage)


module.exports = router