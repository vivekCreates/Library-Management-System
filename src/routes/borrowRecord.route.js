import { Router } from "express";
import { borrowBook, getAllBorrowBooks, getAllUsersBorrowBooks, getBorrowBook, returnBorrowedBook } from "../controllers/borrorBook.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware)
router.route("/:id").post(borrowBook)
router.route("/return/:id").patch(returnBorrowedBook)
router.route("/:id").get(getBorrowBook)
router.route("/books").get(getAllBorrowBooks)
router.route("/users").post(getAllUsersBorrowBooks)


export default router