import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IReadSoon } from "./readSoon.interface";
import { WishlistService } from "./readSoon.service";

const getWishlist: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await WishlistService.getWishlist(id);

  sendResponse<IReadSoon>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "read soon list retrieved successfully",
    data: result,
  });
});

const addToWishlist: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await WishlistService.addToWishlist(id, updateData);

  sendResponse<IReadSoon>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added to read soon list successfully",
    data: result,
  });
});

const finishedReading: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await WishlistService.finishedReading(id, updateData);

  sendResponse<IReadSoon>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book marked as finished successfully",
    data: result,
  });
});

export const WishlistController = {
  getWishlist,
  finishedReading,
  addToWishlist,
};
