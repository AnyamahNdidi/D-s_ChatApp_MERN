const userModel = require("../Models/userModel")
const chatModel = require("../Models/chats")
const asyncHandler = require("express-async-handler")
const messageModel = require("../Models/messageModel")



const sendMessage = asyncHandler(async(req, res) => {
  
    const { content, chatId } = req.body
    if (!content || !chatId)
    {
        console.log("invalid data passed into the request")
        return res.sendStatus(400)
    }

    try
    {
        let messageData = await messageModel.create({
            sender: req.user._id,
            content: content,
            chat:chatId 
        })

        messageData = await messageData.populate("sender", "name pic");
        messageData = await messageData.populate("chat");
        messageData = await userModel.populate(messageData,
            {
                path: "chat.users",
                select: "name pic email"
            });
        
        await chatModel.findByIdAndUpdate(req.body.chatId, {
            latestMessage: messageData
        })
        
        res.status(201).json(messageData)
        
    
    } catch (err)
    {
        res.status(400).json({
            message:err.message
        })
    }
})


const allMessage  = asyncHandler(async(req, res)=>{
    try
    {
        const message = await messageModel.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate("chat")
        
        res.status(200).json(message)
       
    } catch (err)
    {
          res.status(400).json({
            message:err.message
        })
   }
})


module.exports = {sendMessage, allMessage}