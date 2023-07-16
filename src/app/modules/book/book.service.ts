import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { bookSearchableFields } from "./book.constants";

// Create Book
const createBook = async (payload: IBook): Promise<IBook | null> => {
  const dateObject = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const publicationDate = formatter.format(dateObject);

  payload.publicationDate = publicationDate;

  const result = await Book.create(payload);
  return result;
};

// Get All Books (can also filter)
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<any> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions: any = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: bookSearchableFields?.map((field: any) => ({
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
        if (field === "maxPrice") {
          return { price: { $lte: value } };
        } else if (field === "minPrice") {
          return { price: { $gte: value } };
        }
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
  const result = await Book.findOne({ _id: id });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book not found");
  }

  const { ...BookData } = payload;

  const updateBookData: Partial<IBook> = { ...BookData };

  const result = await Book.findOneAndUpdate({ _id: id }, updateBookData, {
    new: true,
  });
  return result;
};

// Delete Book
const deleteBook = async (id: string): Promise<IBook | null> => {
  const findBook = await Book.findOne({ _id: id });
  console.log(findBook);
  if (!findBook) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found!");
  }

  // Verification for seller of the book
  const bookSeller = await Book.findOne({ _id: id });

  if (!bookSeller) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You're not the seller of the book!"
    );
  }

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
