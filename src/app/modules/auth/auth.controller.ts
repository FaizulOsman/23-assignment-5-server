import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import { IUser } from "../user/user.interface";
import config from "../../../config";

// Create Auth
const createAuth: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;

    const postData: any = await AuthService.createAuth(userData);

    postData.set("password", undefined, { strict: false });
    const result = await postData;

    // Send Response
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  }
);

// Login Auth
const loginAuth = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginAuth(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Auth logged in successfully !",
    data: result,
  });
});

export const AuthController = {
  createAuth,
  loginAuth,
};
