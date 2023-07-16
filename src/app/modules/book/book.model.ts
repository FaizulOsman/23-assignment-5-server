import { Schema, model } from "mongoose";
import { IBook, BookModel } from "./book.interface";

// Book Schema
const BookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: [true, "title is missing!"],
    },
    author: {
      type: String,
      required: [true, "author is missing!"],
    },
    genre: {
      type: String,
      required: [true, "genre is missing!"],
    },
    publicationDate: {
      type: String,
      required: [true, "publication date is missing!"],
    },
    reviews: {
      type: Array,
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>("Book", BookSchema);
