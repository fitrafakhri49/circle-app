import  express  from "express";
import authroute from "./routes/auth";
import thread from "./routes/thread";
import cors from "../src/middlewares/cors";
import path from "path";
const app=express()
app.use(cors)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",authroute,thread)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`)
})