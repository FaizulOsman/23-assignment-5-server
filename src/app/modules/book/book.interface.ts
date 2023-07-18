import { Model } from "mongoose";

export type IReview = {
  userName: string;
  review: string;
  rating: number;
  userEmail: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate?: string;
  publicationYear?: string;
  image: string;
  creator: string;
  reviews?: IReview[];
};

// Book Model
export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  location?: string;
  price?: string;
  age?: number;
  name?: string;
  breed?: string;
  weight?: number;
  category?: string;
};
