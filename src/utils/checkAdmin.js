import { userRolesEnum } from "../constant.js";
import { User } from "../models/user.model.js"
import { ApiError } from "./apiError.js";


const checkCurrentUserAdminOrNot = async(userId)=>{
const user = await User.findById(userId);
console.log(user)
    if(user.role!=userRolesEnum.ADMIN){
        throw new ApiError(400,"Only Admin can Access")
    }
}

export default checkCurrentUserAdminOrNot