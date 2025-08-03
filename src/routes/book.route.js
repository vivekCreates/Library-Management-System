import { Router } from "express";
import { 
    addBook,
    getAllBooks,
    getBook,
    deleteBook,
    increaseBookTotalCount
} from "../controllers/book.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import authorizeRole from "../middlewares/authorizeRole.middleware.js";


const router = Router();

router.route("/").get(getAllBooks);
router.route("/add").post(upload.single("coverImageUrl"),authMiddleware,authorizeRole("ADMIN") ,addBook);
router.route("/:id").get(authMiddleware,getBook);
router.route("/:id").post(authMiddleware,deleteBook);
router.route("/:id").patch(authMiddleware,increaseBookTotalCount);


export default router;