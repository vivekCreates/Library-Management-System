import { Router } from "express";
import { borrowBook, getAllBorrowBooks, getAllUsersBorrowBooks, getBorrowBook, returnBorrowedBook } from "../controllers/borrorBook.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/authorizeRole.middleware.js";
const router = Router();

// router.use(authMiddleware)
router.route("/users").get(authMiddleware,authorizeRole,getAllUsersBorrowBooks)
router.route("/books").get(authMiddleware,authorizeRole,getAllBorrowBooks)
router.route("/:id").post(authMiddleware,authorizeRole,borrowBook)
router.route("/return/:id").patch(returnBorrowedBook)
router.route("/:id").get(getBorrowBook)


export default router