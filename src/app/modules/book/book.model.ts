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
      required: [true, "publicationDate is missing!"],
    },
    publicationYear: {
      type: String,
      required: [true, "publicationYear is missing!"],
    },
    image: {
      type: String,
      required: [true, "image is missing!"],
    },
    creator: {
      type: String,
      required: [true, "creator is missing!"],
    },
    reviews: [
      {
        userName: {
          type: String,
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
        userEmail: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>("Book", BookSchema);
