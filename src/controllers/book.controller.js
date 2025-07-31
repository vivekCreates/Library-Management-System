import { Book } from "../models/book.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import checkCurrentUserAdminOrNot from "../utils/checkAdmin.js";

const addBook = asyncHandler(async (req, res) => {

  checkCurrentUserAdminOrNot(req.user?._id);

  const { title, genre, description, author } = req.body;

  if (
    [title, genre, description, author].some((fields) => fields?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedBook = await Book.findOne({ title, author });
  
  if (existedBook) {
    throw new ApiError(400,"Book already exists with this title and author");
  }
 
    const book = await Book.create({
        title,
        genre,
        description,
        author,
      });


  return res
    .status(200)
    .json(new ApiResponse(200, { book }, "Book Added successfully"));
});


const getBook = asyncHandler(async(req,res)=>{
 
    const {id} = req.params;

    const book = await Book.findById(id);

    if(!book){
        throw new ApiError(400,"Book not found");
    }

    return res.status(200).json(
        new ApiResponse(200,{book},"book fetch successfully")
    )
    
});


const getAllBooks = asyncHandler(async(req,res)=>{
  
    const books = await Book.find();
    if(books.length==0){
        throw new ApiError(400,"No book exists")
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            {books},
            "books fetch successfully"
        )
    )
});

const deleteBook = asyncHandler(async(req,res)=>{
  checkCurrentUserAdminOrNot(req.user?._id)
  const {id} = req.params;
  await Book.findByIdAndDelete(id);
  return res.status(200).json(
    new ApiResponse(200,"book deleted successfully")
  )
});

const increaseBookTotalCount = asyncHandler(async(req,res)=>{
  checkCurrentUserAdminOrNot(req.user?._id);
  const {id} = req.params;

  const book = await Book.findByIdAndUpdate(id,{
    $inc:{availableCopies:1,totalCopies:1},
  })

  return res.status(200).json(
    new ApiResponse(200,{book},"book count increased")
  )
});




export { 
    addBook,
    getBook,
    getAllBooks,
    deleteBook,
    increaseBookTotalCount
};
