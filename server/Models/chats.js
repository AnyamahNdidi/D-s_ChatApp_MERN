const mongoose = require("mongoose")


const chatModel = mongoose.Schema(
    {
        chatName: {
            type: String,
            trim:true
        },
        isGroupChat: {
            type: Boolean,
            default:false
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"users"
        }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"messages"
        },
        isAdmin: {
             type: mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    },
    {timestamps:true}
)

const chats = mongoose.model("chats", chatModel)

module.exports = chats


//chatName
//users
//message
//isGroupChat
//if is is a Group caht hwo is the Admin


