import { User } from "../models/user.model.js"
import { ApiError } from "./apiError.js";


const checkCurrentUserAdminOrNot = async()=>{
const user = await User.findById(req.user?._id);
    if(user.role!="ADMIN"){
        throw new ApiError(400,"Only Admin can Access")
    }
}

export default checkCurrentUserAdminOrNot