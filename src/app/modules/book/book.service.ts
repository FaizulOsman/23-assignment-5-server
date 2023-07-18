/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { bookSearchableFields } from "./book.constants";
import { JwtPayload } from "jsonwebtoken";
import { IGenericResponse } from "../../../interfaces/common";
import { User } from "../user/user.model";

// Create Book
const createBook = async (
  payload: IBook,
  verifiedUser: any
): Promise<IBook | null> => {
  payload.creator = verifiedUser.id;
  console.log(verifiedUser);
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await Book.create(payload);
  return result;
};

// Get All Books (can also filter)
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: bookSearchableFields?.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: "" | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereCondition)
    .populate("reviews")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Book
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate("reviews");
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  user: JwtPayload | null
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book not found");
  }

  // check if the user is the owner of this Book or not.
  const isUserMatch = await Book.findOne({
    $and: [{ _id: id }, { creator: user && user?.id }],
  });

  if (!isUserMatch) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this Book"
    );
  }

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("reviews");

  return result;
};

// Delete Book
const deleteBook = async (
  id: string,
  user: JwtPayload | null
): Promise<IBook | null> => {
  // check if the user is the owner of this Book or not.
  const isUserMatch = await Book.findOne({
    $and: [{ _id: id }, { creator: user && user?.id }],
  });
  if (!isUserMatch) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete this book."
    );
  }

  const result = await Book.findByIdAndDelete(id).populate("reviews");
  return result;
};

const addReview = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book not found");
  }

  const result = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: payload } },
    {
      new: true,
    }
  ).populate("reviews");
  console.log(result);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addReview,
};
