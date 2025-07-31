import { Router } from "express";
import { borrowBook } from "../controllers/borrorBook.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/:id").post(authMiddleware, borrowBook)


export default router