const jwt = require("jsonwebtoken")
const userModel = require("../Models/userModel")
const asyncHandler = require("express-async-handler")

const verify = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try
        {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await userModel.findById(decoded.id).select("-password")
            
            next()
        } catch (error)
        {
            res.status(401).json({
                message:`not authorization token failed ${error.message}`
            })
            
        }
    }

    if(!token){
        res.status(401).json({message :"not authorization, no token provided"})
    }
})

module.exports = {verify}