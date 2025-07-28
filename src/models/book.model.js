import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        totalCopies:{
            type:Number,
            default:5
        },
        availableCopies:{
            type:Number,
            default:5
        },
        price:{
            type:Number,
            enum:["INR","USD"]
        }
    }
    ,{timestamps:true})

export const Book = mongoose.model("Book",bookSchema)