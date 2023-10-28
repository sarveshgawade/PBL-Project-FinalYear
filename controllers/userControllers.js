import user from "../models/userModule.js"

const signup = async (req,res) => {
    try {
        const {fullName,userName,password} = req.body

        if(!fullName || !userName || !password){
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
            userName,
            password
        })

        if(!newUser){
            res.status(500).json({
                success: false,
                message: 'Error in registration, please try again !'
            })
        }

        await newUser.save()

        res.status(200).json({
            success: true,
            message: 'User created successfully !'
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

        if(!existingUser || password !== existingUser.password){
            res.status(500).json({
                success: false,
                message: 'username and password wont match !'
            })
        }

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


export {signup,signin}