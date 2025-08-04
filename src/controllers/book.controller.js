import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import checkCurrentUserAdminOrNot from "../utils/checkAdmin.js";
import uploadImageOnCloudinary from "../utils/uploadOnCloudinary.js";

const addBook = asyncHandler(async (req, res) => {

  const { title, genre, description, author ,summary,coverImageColor} = req.body;

  console.log("body: ",req.body);
  if (
    [title, genre, description, author,summary,coverImageColor].some((fields) => fields?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required");
  }


  const existedBook = await Book.findOne({ title, author });
  
  if (existedBook) {
    throw new ApiError(400,"Book already exists with this title and author");
  }

  const coverImageFilePath = req.file?.path;
 
  if(!coverImageFilePath){
    throw new ApiError(400,"Cover image is required")
  }
  const coverImage = await uploadImageOnCloudinary(coverImageFilePath)

    const book = await Book.create({
        title,
        genre,
        description,
        author,
        summary,
        coverImageColor,
        coverImageUrl:coverImage?.secure_url
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
  const {id} = req.params;
  await Book.findByIdAndDelete(id);
  return res.status(200).json(
    new ApiResponse(200,"book deleted successfully")
  )
});

const increaseBookTotalCount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { count = 1 } = req.body;

  const book = await Book.findByIdAndUpdate(
    id,
    {
      $inc: {
        availableCopies: count,
        totalCopies: count,
      },
    },
    { new: true }
  );

  if (!book) {
    return res.status(404).json(new ApiResponse(404, null, "Book not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { book }, "Book count increased"));
});





export { 
    addBook,
    getBook,
    getAllBooks,
    deleteBook,
    increaseBookTotalCount
};
