import { User } from "./user.model";

// Get All Users (can also filter)
const getAllUsers = async (): Promise<any> => {
  const result = await User.find();

  const total = await User.countDocuments();

  return {
    meta: {
      total,
    },
    data: result,
  };
};

export const UserService = {
  getAllUsers,
};
