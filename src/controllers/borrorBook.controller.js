import { bookStatusEnum } from "../constant.js";
import { Book } from "../models/book.model.js";
import { BorrowRecord } from "../models/borrowRecord.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import calculateBorrowBookReturnDate from "../utils/bookReturnDate.js";
import calculateBorrowBookLoanAmount from "../utils/calculateLoanAmount.js";
import checkCurrentUserAdminOrNot from "../utils/checkAdmin.js";

const borrowBook = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {duration} = req.body;

    if(!duration){
        throw new ApiError(400,"Duration is required")
    }
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

});

const returnBorrowedBook = asyncHandler(async(req,res)=>{
    const {id} = req.params;
   
    const book = await Book.findOne({_id:id});
    console.log(book)
    const record = await BorrowRecord.findOneAndUpdate({bookId:id,userId:req.user._id,status:bookStatusEnum.BORROWED},{
        status:bookStatusEnum.RETURNED,
        loanAmount:calculateBorrowBookLoanAmount(book.dueDate,new Date())
    },{
        new:true
    }
);
    if(!record){
        throw new ApiError(404,"Book not found")
    }

    return res.status(200).json(
        new ApiResponse(200,{book},"Book returned successfully")
    )

});

const getBorrowBook = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    const book = await Book.findById(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            {book},
            "Book fetch successfully"
        )
    )
});

const getAllBorrowBooks = asyncHandler(async(req,res)=>{
    checkCurrentUserAdminOrNot(req.user._id)
    const books = await BorrowRecord.find().populate("bookId")
    return res.status(200).json(
        new ApiResponse(200,{books},"Borrow book fetch successfully")
    )
});


const getAllUsersBorrowBooks = asyncHandler(async(req,res)=>{
    checkCurrentUserAdminOrNot(req.user._id)
    const books = await BorrowRecord.find().populate("userId")
    return res.status(200).json(
        new ApiResponse(200,{books},"Borrow book fetch successfully")
    )
});

export {
    borrowBook,
    returnBorrowedBook,
    getBorrowBook,
    getAllBorrowBooks,
    getAllUsersBorrowBooks
}