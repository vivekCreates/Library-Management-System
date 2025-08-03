import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();


app.use(cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
))
app.use(express.json());
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


// import routes
import userRoutes from "./routes/user.route.js";
import bookRoutes from "./routes/book.route.js";
import borrowRoutes from "./routes/borrowRecord.route.js";
import errorHandler from "./middlewares/error.middleware.js";


// decleare routes
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/books",bookRoutes);
app.use("/api/v1/borrows",borrowRoutes);



app.use(errorHandler);
export default app;