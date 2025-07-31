import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    console.log("token: ", token);
    if (!token) {
      throw new ApiError(401, "Unauthorized access, please login first.");
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const user = await User.findById(decoded?._id);
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};

export default authMiddleware;
