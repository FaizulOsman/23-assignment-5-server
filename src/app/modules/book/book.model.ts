import { Schema, model } from "mongoose";
import { IBook, BookModel } from "./book.interface";

// Book Schema
const bookSchema = new Schema<IBook, BookModel>(
  {
    name: {
      type: String,
      required: [true, "name is missing!"],
    },
    price: {
      type: Number,
      required: [true, "price is missing!"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>("Book", bookSchema);
