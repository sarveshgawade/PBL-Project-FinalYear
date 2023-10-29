import user from "../models/userModule.js"


// creating cookie configurations
const cookieOptions = {
    maxAge: 7*24*60*60*1000, // 7 days (in milli-seconds)
    httpOnly: true,
    secure: false
}


const signup = async (req,res) => {
    try {
        const {fullName,email,userName,password} = req.body

        if(!fullName || !userName || !password || !email){
            res.status(500).json({
                success: false,
                message: 'All fields are required !'
            })
        }

        const existingUser = await user.findOne({userName})

        if(existingUser){
            res.status(500).json({
                success: false,
                message: 'User already exists !'
            })
        }

        const newUser = await user.create({
            fullName,
            email,
            userName,
            password
        })

        if(!newUser){
            res.status(500).json({
                success: false,
                message: 'Error in registration, please try again !'
            })
        }

        // saving user to DB
        await newUser.save()

        // generating token
        const token = await newUser.generateJWTtoken()

        // putting token into cookie & sending cookie into response
        res.cookie('token',token,cookieOptions)

        // setting pasword as undefined so that user cannot get the password in return when we send user-obj in response as shown below
        newUser.password = undefined

        // sending success response
        res.status(200).json({
            success: true,
            message: 'User created successfully !',
            newUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const signin = async (req,res) => {
    try {
        const {userName,password} = req.body

        if(!userName || !password){
            res.status(500).json({
                success: false,
                message: 'All fields are required'
            })
        }

        // here we need to explicitly get the password since it was not selected by default in the user-schema

        const existingUser = await user.findOne({userName}).select('+password')

        if(!existingUser || !(await existingUser.comparePassword(password))){
            res.status(500).json({
                success: false,
                message: 'username and password wont match !'
            })
        }

        // generating token
        const token = await existingUser.generateJWTtoken()

        // putting token into coookie & sending it in response
        res.cookie('token',token,cookieOptions)

        existingUser.password = undefined

        // login success message/response
        res.status(200).json({
            success: true,
            message: 'Logged in successfully !',
            existingUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const logout = async (req,res) => {
    try {
        res.cookie('token',null,{
            httpOnly: true,
            maxAge: 0 ,
            secure: true
        })

        res.status(200).json({
            success :true ,
            message: `User logged out successfully`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {signup,signin,logout}