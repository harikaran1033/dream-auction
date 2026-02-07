import http from "http"
import { Server } from "socket.io";
import dotenv from "dotenv"

import app from "./app.js";
import connectDB from "./config/db.js"
import registerSockets from "./sockets/index.js"

import {setIO} from "./sockets/io.js"

dotenv.config()

const PORT = process.env.PORT

await connectDB()

const httpServer = http.createServer(app)


const io = new Server(httpServer,{
     cors:{
        origin:"*"
     },
})

setIO(io)
registerSockets(io)


httpServer.listen(PORT,()=>{
    console.log(`server listening to  the PORT: ${PORT}`)
})







