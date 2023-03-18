const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/db")
const useRoutes = require("./routes/userRouter")
const chatRoute = require("./routes/chatRoute")
const {notFound, errorHandler} = require("./middleware/errorMiddleware")

dotenv.config();

const port = process.env.PORT || 5000;

connectDb()
const app = express();



app.use(cors());
app.use(express.json())
app.get("/", (req, res) => {
    res.send("API IS UP AND RUNNIING")
})

app.get("/api/chats", (req, res) => {
    res.send(chats)
})

app.get("/api/chats/:id", (req, res) => {
    console.log(req.params.id)
    const singlechat = chats.find((c )=> c._id === req.params.id)
    res.send(singlechat)
})
// Error Handling middlewares

app.use("/api/user", useRoutes)
app.use("/api/chat", chatRoute)
app.use(notFound);
app.use(errorHandler);
app.listen(port, ()=>{
    console.log(`server is up and running on ${port} `)
})