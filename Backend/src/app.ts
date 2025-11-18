import  express  from "express";
import authroute from "./routes/auth";
const app=express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",authroute)
app.listen(process.env.PORT,()=>{
    console.log("server is running")
})