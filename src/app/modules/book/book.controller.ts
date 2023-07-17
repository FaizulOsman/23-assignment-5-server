/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from "express";
import { BookService } from "./book.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IBook } from "./book.interface";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constants";
import { paginationFields } from "../../../constants/pagination";
import { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";

// Create Book
const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...bookData } = req.body;

    const result = await BookService.createBook(bookData, verifiedUser);

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
    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books retrieved Successfully",
      meta: result.meta,
      data: result.data,
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

  const user: JwtPayload | null = req?.user;
  const result = await BookService.updateBook(id, updateData, user);

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
  const user: JwtPayload | null = req?.user;

  const result = await BookService.deleteBook(id, user);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

// Add Review
export const addReview: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await BookService.addReview(id, updateData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review added successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addReview,
};
