import { ApiError } from "../utils/apiError.js";


const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ||  500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message:error?.message
  }

  return res.status(400).json(response);
}

export default errorHandler;