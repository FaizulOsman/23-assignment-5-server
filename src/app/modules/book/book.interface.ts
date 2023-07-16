import { Model, Types } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: [];
  rating?: number;
};

// Book Model
export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
};
