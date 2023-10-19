import express from "express";
import connectToDB from "./config/dbConnection.js";

const app = express()

// connecting with DB
connectToDB()

// middleware
app.use(express.json())


// routes
app.use('/ping',(req,res)=>{
    res.status(200).json({
        success: true,
        message: "pong"
    })
})

export default app