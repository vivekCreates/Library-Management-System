import { ApiError } from "../utils/apiError.js";

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user?.role !== requiredRole) {
      return next(new ApiError(403, `Only ${requiredRole}s can access this route`));
    }
    next();
  };
};


export default authorizeRole