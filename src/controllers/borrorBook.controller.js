import { BorrowRecord } from "../models/borrowRecord.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const borrowBook = asyncHandler(async(req,res)=>{
    const {id,duration} = req.params;
    const alreadyBorrowBook = await BorrowRecord.findOne({userId:req.user._id,bookId:id})
    if(alreadyBorrowBook){
        throw new ApiError(400,"Book already borrowed")
    }

    const {borrowDate,dueDate} = calculateBorrowBookReturnDate(duration);

    const borrow = await BorrowRecord.create({
        userId:req.user._id,
        bookId:id,
        borrowDate,
        dueDate
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            {book:borrow},
            "Book borrowed successfully"
        )
    )

})



export {
    borrowBook
}