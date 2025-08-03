import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectToDatabase = async() => {
    if(!process.env.MONGODB_URI){
        console.log("Please check your mongodb URI")
        return;
    }
    try {
        const connectedInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongodb connected successfully! db host at: ${connectedInstance.connection.host}` );
        
    } catch (error) {
        console.error("Mongodb not connected",error);
        process.exit(1);
    }
}

export default connectToDatabase