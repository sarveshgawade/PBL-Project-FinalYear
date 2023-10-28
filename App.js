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



// for wrong requests
app.all('*',(req,res)=>{    // if somebody enters url other than any route defined here 
    res.status(404).send(`Oops ! Page 404 not found !`)
})
export default app