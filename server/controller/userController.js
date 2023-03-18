const asyncHandler = require('express-async-handler');
const userModle = require("../Models/userModel")
const generateToken = require("../config/generateToken")
const bcrypt  = require("bcrypt")




 const userReg = asyncHandler(async (req, res) => {

   
        const { name, email, password, pic } = req.body;
        
    
    if (!email || !password || !name)
    {
         return res.status(400).json({mesage:"please enter all field"})
    }

    const usesExist = await userModle.findOne({ email })
    if (usesExist)
    {
        return res.status(401).json({message:"email already exist"})
    }

    const createUser = await userModle.create({
        name,
        email,
        password,
        pic
    })
    res.status(201).json({
        message: "user created",
        data: createUser,
        token:generateToken(createUser._id)
    })
        
   
    
  
     
 }) 


const loginUser = asyncHandler(async (req, res) => { 

        const { email, password } = req.body
        const user = await userModle.findOne({ email })

        if (user)
        {
            const checkaPassword = await user.matchPassword(password)
            if (checkaPassword)
            {
                const { password, ...info } = user._doc
                return res.status(200).json(
                    {
                        message: "user found",
                        data: {
                            ...info,
                            token:generateToken(user._id)

                        }
                    }
                )
                
            } else
            {
                return res.status(404).json({ message: "wrong password" }); 
            }
            
        } else
        {
            return res.status(404).json({ message: "user can not be found" });
        }
           
})

const allUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or:[
            {name:{$regex: req.query.search, $options:"i" }},
            {email:{$regex: req.query.search, $options:"i" }}
        ]
    } : {}
    
    const user = await userModle.find(keyword).find({_id:{ $ne:req.user._id}})
    res.send(user)
})

 module.exports = {userReg, loginUser, allUser}