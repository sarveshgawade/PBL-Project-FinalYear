import mongoose from "mongoose";
import { config } from "dotenv";
config()

const connectToDB = async () =>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected with DB: ${connection.host}`);
    } catch (error) {
        console.log(`Error in connecting with database: ${error}`);
        process.exit(1)
    }
}

export default connectToDB