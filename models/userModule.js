import mongoose,{model} from "mongoose"

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

const user = model('User',userSchema)

export default user