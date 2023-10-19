import app from "./App.js";
import { config } from "dotenv";
config()


const PORT = process.env.PORT || 5555

app.listen(PORT,()=>{
    console.log(`Listening at port: ${PORT}`);
})




