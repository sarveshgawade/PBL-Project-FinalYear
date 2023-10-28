import express from "express";
import connectToDB from "./config/dbConnection.js";

import userRoute from './routes/userRoutes.js'

const app = express()

// connecting with DB
connectToDB()

// middleware
app.use(express.json())


// routes
app.use('/ping',(req,res)=>{
    res.status(200).json({
        success: true,
        message: "pong__"
    })
})

app.use('/user',userRoute)

export default app