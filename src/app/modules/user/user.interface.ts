import { Model } from "mongoose";

export type IUser = {
  email: string;
  password: string;
};

// User Model (Static)
export type UserModel = {
  isUserExist(email: string): Promise<Pick<IUser, "email" | "password">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
};
