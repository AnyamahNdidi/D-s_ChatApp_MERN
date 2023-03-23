const express = require('express');
const router = express.Router()
const {verify} = require("../middleware/authMiddleWare")

const {accessChat, fetchChatc, groupChatCreate, updateGroupName, addmemberToGroup, removememberFromGroup} = require("../controller/chatController")

router.route("/").post(verify, accessChat)
router.route("/").get(verify, fetchChatc)
router.route("/group").post(verify, groupChatCreate)
router.route("/rename").put(verify, updateGroupName)
router.route("/addnew").put(verify, addmemberToGroup)
router.route("/rename").put(verify, removememberFromGroup)

module.exports = router