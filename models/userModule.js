import mongoose,{model} from "mongoose"
import bcrypt from 'bcrypt'

// creating user schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: 'String',
        require : [true,'name is a required field'],
        trim: true
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
// userSchema.methods = {

// }

const user = model('User',userSchema)

export default user