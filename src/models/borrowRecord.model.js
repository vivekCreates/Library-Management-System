import mongoose from "mongoose";
import { bookStatusEnum } from "../constant.js";

const borrowRecordSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        },
        bookId:{
            type:mongoose.Schema.ObjectId,
            ref:"Book"
        },
        borrowDate:{
            type:Date
        },
        dueDate:{
            type:Date
        },
        loanAmount:{
            type:Number,
            default:0
        },
        status:{
            type:String,
            enum:bookStatusEnum,
            default:"BORROWED"
        }
    },
    {timestamps:true}
)

export const BorrowRecord  = mongoose.model("BorrowRecord",borrowRecordSchema);