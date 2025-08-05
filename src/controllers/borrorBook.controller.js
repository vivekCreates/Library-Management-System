import { bookStatusEnum } from "../constant.js";
import { Book } from "../models/book.model.js";
import { BorrowRecord } from "../models/borrowRecord.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import calculateBorrowBookReturnDate from "../utils/bookReturnDate.js";
import calculateBorrowBookLoanAmount from "../utils/calculateLoanAmount.js";

const borrowBook = asyncHandler(async (req, res) => {
  const { id: bookId } = req.params;
  const { duration } = req.body;

  if (!duration) {
    throw new ApiError(400, "Duration is required");
  }
  const alreadyBorrowBook = await BorrowRecord.findOne({
    userId: req.user._id,
    bookId:bookId,
  });
  if (alreadyBorrowBook) {
    throw new ApiError(400, "Book already borrowed");
  }

  const { borrowDate, dueDate } = calculateBorrowBookReturnDate(duration);

  const borrow = await BorrowRecord.create({
    userId: req.user._id,
    bookId,
    borrowDate,
    dueDate,
  });

  await Book.findByIdAndUpdate(
    bookId,
    {
      $inc: {
        availableCopies: -1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { book: borrow }, "Book borrowed successfully"));
});

const returnBorrowedBook = asyncHandler(async (req, res) => {
  const { id:bookId } = req.params;

  const book = await Book.findOne({ _id: bookId });
  console.log(book);
  const record = await BorrowRecord.findOneAndUpdate(
    { bookId, userId: req.user._id, status: bookStatusEnum.BORROWED },
    {
      status: bookStatusEnum.RETURNED,
      loanAmount: calculateBorrowBookLoanAmount(book.dueDate, new Date()),
    },
    {
      new: true,
    }
  );
  if (!record) {
    throw new ApiError(404, "Book not found");
  }

  await Book.findByIdAndUpdate(
    bookId,
    {
      $inc: {
        availableCopies:+1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { book }, "Book returned successfully"));
});

const getBorrowBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  return res
    .status(200)
    .json(new ApiResponse(200, { book }, "Book fetch successfully"));
});

const getAllBorrowBooks = asyncHandler(async (req, res) => {
  const bookRecords = await BorrowRecord.find({status:"BORROWED"}).populate("bookId");
  const borrowedBooks = bookRecords.map(record => record.bookId);

  const uniqueBooks = Array.from(
    new Map(borrowedBooks.map(book => [book._id.toString(), book])).values()
  );
  return res
    .status(200)
    .json(new ApiResponse(200, { books: uniqueBooks }, "Borrow book fetch successfully"));
});

const getAllUsersBorrowBooks = asyncHandler(async (req, res) => {
  const userRecords = await BorrowRecord.find({status:"BORROWED"}).populate("userId");
  const users = userRecords.map((user)=>user.userId);

  const uniqueUsers = Array.from(
    new Map(users.map((user)=>[user._id.toString(),user])).values()
  )
  return res
    .status(200)
    .json(new ApiResponse(200, { users:uniqueUsers }, "Borrow book fetch successfully"));
});



export {
  borrowBook,
  returnBorrowedBook,
  getBorrowBook,
  getAllBorrowBooks,
  getAllUsersBorrowBooks,
};
