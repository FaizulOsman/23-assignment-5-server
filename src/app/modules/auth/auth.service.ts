import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ILoginAuth } from "./auth.interface";

// Create User
const createAuth = async (payload: IUser): Promise<IUser | null> => {
  const isExist = await User.findOne({ email: payload.email });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "Email Already Exist");
  }

  const result = await User.create(payload);
  return result;
};

// Login Auth
const loginAuth = async (payload: ILoginAuth) => {
  const { email, password } = payload;

  const isAuthExist: any = await User.findOne({ email });

  if (isAuthExist?.password !== password) {
    throw new ApiError(httpStatus.NOT_FOUND, "Password is incorrect");
  }
};

export const AuthService = {
  createAuth,
  loginAuth,
};
