import { Request, RequestHandler, Response } from "express";
import { BookService } from "./book.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IBook } from "./book.interface";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constants";
import { paginationFields } from "../../../constants/pagination";

// Create Book
const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...bookData } = req.body;

    const result = await BookService.createBook(bookData);

    // Send Response
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book Created Successfully",
      data: result,
    });
  }
);

// Get all books
const getAllBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookService.getAllBooks(filters, paginationOptions);

    // Send Response
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get All Books Successfully",
      data: result,
    });
  }
);

// Get single Book by id
const getSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.getSingleBook(id);

    // Send Response
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get Single Book Successfully",
      data: result,
    });
  }
);

// Update Book
const updateBook: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await BookService.updateBook(id, updateData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

// Delete Book
const deleteBook: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookService.deleteBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
