import  express  from "express";
import authroute from "./routes/auth";
import thread from "./routes/thread";
import cors from "../src/middlewares/cors";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import corsMiddleware from "../src/middlewares/cors";
import reply from "./routes/replies";


const app=express()
const server=http.createServer(app)
app.use(corsMiddleware)

export const io = new Server(server,{
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
        credentials: true
      },
      transports: ["websocket", "polling"],
      pingTimeout: 60000,
      pingInterval: 25000,
})

io.on("connection", (socket) => {
    socket.on("new-thread", (data) => {
      io.emit("new-thread", data);
    });
  
    socket.on("disconnect", (reason) => {
      console.log("Client Terputus", socket.id,reason);
    });
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",authroute,thread,reply)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
server.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`)
})