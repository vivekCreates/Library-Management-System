import { Router } from "express";
import {
  getAllUsers,
  getCurrentUser,
  signInUser,
  signOutUser,
  signUpUser,
} from "../controllers/user.contoller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/sign-up").post(signUpUser);
router.route("/sign-in").post(signInUser);
router.route("/sign-out").post(authMiddleware, signOutUser);
router.route("/").get(getAllUsers);
router.route("/me").get(authMiddleware,getCurrentUser);

export default router;
