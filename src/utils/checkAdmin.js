import { User } from "../models/user.model.js"
import { ApiError } from "./apiError.js";


const checkCurrentUserAdminOrNot = async(userId)=>{
const user = await User.findById(userId);
    if(user.role!="ADMIN"){
        throw new ApiError(400,"Only Admin can Access")
    }
}

export default checkCurrentUserAdminOrNot