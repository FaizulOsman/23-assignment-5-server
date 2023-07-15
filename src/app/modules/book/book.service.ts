import { IBook } from "./book.interface";
import { Book } from "./book.model";

// Create Book
const createBook = async (payload: IBook): Promise<IBook | null> => {
  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz");

  const result = await Book.create(payload);
  return result;
};

// Get All Books (can also filter)
const getAllBooks = async (): Promise<any> => {
  const result = await Book.find();

  return {
    data: result,
  };
};

// Get Single Book
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id });
  return result;
};

// Update Book
const updateBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id });
  return result;
};

// Delete Book
const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete({ _id: id });

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
