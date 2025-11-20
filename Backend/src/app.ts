import  express  from "express";
import authroute from "./routes/auth";
import thread from "./routes/thread";
import cors from "../src/middlewares/cors";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import corsMiddleware from "../src/middlewares/cors";


const app=express()
const server=http.createServer(app)
app.use(corsMiddleware)

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"],
        credentials: true
      }
})

io.on("connection", (socket) => {
    socket.on("new-thread", (data) => {
      io.emit("new-thread", data);
    });
  
    socket.on("disconnect", () => {
      console.log("Client Terputus", socket.id);
    });
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",authroute,thread)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
server.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`)
})