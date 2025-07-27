import mongoose from "mongoose";

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
            type:Date,
            default:Date.now()
        },
        returnDate:{
            type:Date
        },
        loanAmount:{
            type:Number,
            default:0
        },
        isRetured:{
            type:Boolean,
            default:false
        }
    },
    {timestamps:true}
)

export const BorrowRecord  = mongoose.model(borrowRecordSchema,"BorrowRecord");