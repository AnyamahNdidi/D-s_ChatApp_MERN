const mongoose = require('mongoose');

const connectMon = async () => {
    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URL) 
        console.log(`database has been connected sucessfully ${conn.connection.host}`)
    } catch (error)
    {
        console.log(`error ${error.message}`)
        process.exit()
    }
}


module.exports = connectMon