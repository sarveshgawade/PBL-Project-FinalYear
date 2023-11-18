import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv';
configDotenv()


const isLoggedIn = async (req,res,next) => {
    try {

        // de-structuring token from cookies
        const {token} = req.cookies

        // if token is not found then user is un-authenticated
        if(!token){
            return next(
                res.status(500).json({
                    success: false ,
                    message: `User unauthenticated`
                })
            )
        }

        // getting userDetalls by cross-verifying the token
        const userDetails = await jwt.verify(token,process.env.SECRET)

        // setting userDetails 
        // ** => which are later gathered inside userContoller.js (getProfile function)
        req.user = userDetails

        next()

    } catch (error) {
        res.status(500).json({
            success : false ,
            message: error.message
        })
    }
}

const  authorizedRoles = (...roles) => async (req,res,next) =>{
    const currentRole = req.user.role

    if(!roles.includes(currentRole)){
        res.status(500).json({
            success: false,
            message: 'You do not the permission to access this route!'
    })
    }

    next()
} 
export  {isLoggedIn,authorizedRoles}