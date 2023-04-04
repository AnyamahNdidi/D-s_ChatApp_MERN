const userModel = require("../Models/userModel")
const chatModel = require("../Models/chats")
const asyncHandler = require("express-async-handler")


const accessChat = asyncHandler(async(req, res) => {
    const { userID } = req.body
    
    if (!userID)
    {
        console.log("User id is not found")
        res.status(404).json({ message: "User id not found"})
    }
    
    // this code check find data that has the login user d and the input user id

    let isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq:req.user._id}}},
            {users: {$elemMatch: {$eq:userID}}}
        ]
    }).populate("users", "-password").populate("latestMessage")

    console.log("opps", isChat)

    isChat = await userModel.populate(isChat, {
        path: "latestMessage.sender",
        select:"name pic email",
    })
    console.log("jksnsjk", isChat)

    // this condition if there is more that on object inside the array
    if (isChat.length > 0)
    {
       return res.send(isChat[0])
    } 
    
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
        
    

})


const fetchChatc = asyncHandler(async (req, res) => {
    
    try
    {
        chatModel.findOne({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({updatedAt: -1})
            .then(async(result) => {
                await userModel.populate(result, {
        path: "latestMessage.sender",
        select:"name pic email",
                })
                res.status(200).send(result)
            })
        
    } catch (error)
    {
        res.status(400).json({
            message:`ERROR FOR ${error.message}`
        })
    }
})

const groupChatCreate = asyncHandler(async (req, res) => {
    const { users, name } = req.body
    
    if (!users || !name)
    {
        return res.status(400).json({message :"please fill all feild"})   
    }

    var allusers = JSON.parse(users)
    if (allusers.length < 2)
    {
        return res.status(400).json({ message :"2 users is needed to form a group chat" })
        
    }
    allusers.push(req.user)

    try
    {
        const groupChat = await chatModel.create({
            chatName: name,
            users: allusers,
            isGroupChat: true,
            groupAdmin:req.user
        })

        const fullChat = await chatModel.findOne({ _id: groupChat._id })
            .populate( "users", "-password",)
            .populate( "groupAdmin", "-password",)
            res.status(200).json(fullChat)
        
    } catch (error)
    {
          res.status(400).json({
            message:`ERROR FOR ${error.message}`
        })
    }


})

const updateGroupName = asyncHandler(async (req, res) => {
    const { chatID, chatName } = req.body
    
    const updateData = await chatModel.findByIdAndUpdate(
        chatID,
        {
            chatName
        },
        {
            new:true
        }

    )  .populate( "users", "-password",)
        .populate("groupAdmin", "-password",)
    
    if (!updateData)
    {
        res.status(400).json({message:"caht not found"})
    } else
    {
        res.status(200).json(updateData)
    }
})

const addmemberToGroup = asyncHandler(async (req, res) => { 
    const { chatID, userID } = req.body
    
    const addedMember = await chatModel.findByIdAndUpdate(
        chatID,     
        { $push: { users: userID }, },
      {new:true}
    )
     .populate( "users", "-password",)
        .populate("groupAdmin", "-password",)
    
    if (!addedMember) {
      return res.status(404).json({message:"caht not found"})
  } else {
    res.json(addedMember);
  }
})


const removememberFromGroup = asyncHandler(async (req, res) => {
     const { chatID, userID } = req.body

     const removeMember = await chatModel.findByIdAndUpdate(
        chatID,     
        { $pull: { users: userID }, },
      {new:true}
    )
     .populate( "users", "-password",)
        .populate("groupAdmin", "-password",)
    
    if (!removeMember) {
      return res.status(404).json({message:"caht not found"})
  } else {
    res.json(addedMember);
  }


 })

module.exports = {
    accessChat,
    fetchChatc,
    groupChatCreate,
    updateGroupName,
    addmemberToGroup,
    removememberFromGroup
    
}