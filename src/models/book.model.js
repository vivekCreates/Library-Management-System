import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        genre:{
            type:String,
            required:true
        },
        coverImageUrl:{
            type:String,
            required:true
        },
        coverImageColor:{
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
        summary:{
            type:String,
            required:true
        },
        totalCopies:{
            type:Number,
            default:1
        },
        availableCopies:{
            type:Number,
            default:1
        }
    }
    ,{timestamps:true})

export const Book = mongoose.model("Book",bookSchema)