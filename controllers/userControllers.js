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
        console.log(error.message);
    }
}

export {signup}