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
        status:{
            type:String,
            enum:["BORROWED","RETURNED"],
            default:"BORROWED"
        }
    },
    {timestamps:true}
)

export const BorrowRecord  = mongoose.model("BorrowRecord",borrowRecordSchema);