import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateJWTToken from "../utils/generateToken.js";

const options = {
  httpOnly: true,
  secure: true
};

const signUpUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (!user) {
    return ApiError(400, "User not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { user }, "User signUp successfully"));
});

const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isPasswordValid = user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "email or password is invalid");
  }

  const token = await generateJWTToken(user._id);
  const userHasToken = await User.findOne({ email });
  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(200, { user: userHasToken }, "User signIn successfully")
    );
});

const signOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { token: 1 },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "User signOut successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    throw new ApiError(400, "You need to signIn first");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "user fetch successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  if (users.length == 0) {
    return res.status(200).json(new ApiResponse(200, "No users yet"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { users }, "users fetch successfully"));
});

export { 
  signUpUser,
  signInUser,
  signOutUser,
  getCurrentUser,
  getAllUsers
};
