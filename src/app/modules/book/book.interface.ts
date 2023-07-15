import { Model, Types } from "mongoose";

export type IBook = {
  name: string;
  price: number;
};

// Book Model
export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
};
