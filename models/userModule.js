import mongoose,{model} from "mongoose"
import bcrypt from 'bcrypt'
import jwtToken from 'jsonwebtoken'
import { configDotenv } from "dotenv"
configDotenv()


// creating user schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: 'String',
        require : [true,'name is a required field'],
        trim: true
    },
    email:{
        type:'String',
        required: [true,`Email is a required field`] ,
        trim: true ,
        unique: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
          ] 

    },
    // take username as PRN
    userName: {
        type: 'String',
        require : [true,'name is a required field'],
        trim: true,
        minLength: [10,'Min length should be 10'],
        maxLength: [10,'Max length should be 10'],
    },
    password:{
        type: 'String',
        require : [true,'name is a required field'],
        trim: true,
        minLength: [7,'Min length should be 7'],
        select: false
    },
    role:{
        type: 'String',
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
},
{
    timestamps:true
})

// for encryption of user password before saving to DB
userSchema.pre('save', async function (next)  {
    if(!this.isModified('password')){
        return next ;
    }

    // 7 -> no. of rounds of hashing
    this.password = await bcrypt.hash(this.password,7)
})


// creating methods for userSchema
userSchema.methods = {
    generateJWTtoken: async function () {
        return await jwtToken.sign(
            {
                id: this._id,
                email: this.email,
                role: this.role,
                userName: this.userName
            },
            process.env.SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    },

    comparePassword: async function (plainTextPassword) {
        return await bcrypt.compare(plainTextPassword,this.password)
    }
}

const user = model('User',userSchema)

export default user