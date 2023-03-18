const userModel = require("../Models/userModel")
const chatModel = require("../Models/chats")
const asyncHandler = require("express-async-handler")


const accessChat = asyncHandler(async(req, res) => {
    const { userID } = req.body
    
    if (!userID)
    {
        console.log("User id is not found")
        res.status(404)  
    }

    let isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq:req.user_id}}},
            {users: {$elemMatch: {$eq:req.userID}}}
        ]
    }).populate("users", "-password").populate("latestMessage")

    isChat = await userModel.populate(isChat, {
        path: "latestMessage.sender",
        select:"name pic email",
    })

    if (isChat.length > 0)
    {
        res.send(isChat[0])
    } else
    {
        let chatData = {
                chatName: "sender",
                isGroupChat: false,
                users:[req.user._id, userID]
        }
        try
        {
            const createChat = await chatModel.create(chatData)
            const fullChat = await chatModel.findOne({ _id: createChat._id }).populate(
                "users", "-password"
            )
            res.status(200).send(fullChat)
             
        } catch (error)
        {
            res.status(400).json({
                message: `ERROR FOR ${error.message}`
            })
        }
        
    }

})


module.exports = {
    accessChat
}