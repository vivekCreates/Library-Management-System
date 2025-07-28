import { User } from "../models/user.model.js"
import { ApiError } from "./apiError.js";

const generateJWTToken = async (userId) =>{
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(500,"User not found")
    }

    const token = user.generateToken();

    if(!token){
        console.log("token not generated")
    }

    user.token = token;
    await user.save({validateBeforeSave:false});
    return token;
}

export default generateJWTToken;