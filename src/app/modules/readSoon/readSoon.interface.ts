/* eslint-disable no-unused-vars */
// import { Model } from 'mongoose';

import { IReview } from "../book/book.interface";

export type IReadSoonBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  publicationYear: string;
  image: string;
  creator: string;
  reviews?: IReview[];
  finishedReading: boolean;
};

export type IReadSoon = {
  _id: string;
  userId: string;
  email: string;
  bookId?: string;
  readSoonList: IReadSoonBook[];
};
