import express from "express";

const app = express()

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