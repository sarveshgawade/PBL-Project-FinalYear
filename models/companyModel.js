import mongoose from "mongoose";

const addCompanySchema = new mongoose.Schema({
    title:{
        type : String,
        required: [true,`Title is Required`],
        trim:true,
        maxLength:[60,`max length of title is 60 characters only`]
    },
    description:{
        type: String,
        maxLength: [200,`max length of title is 200 characters only`],
        required: [true,`Description is required`]
    },
    jobRole:{
        type: String,
        required: [true,`Category is required`]
    },
},{timestamps:true})

const Company = mongoose.model('Company',addCompanySchema)

export default Company