import { Tuser } from "./user.interface";
import { User } from "./user.model";
// import bcrypt from "bcrypt";

const createUserInDB = async (user: Tuser) => {
  const newUser = await User.create(user);
  return newUser;
};

const getAllUsersFromDB = async () => {
  // console.log('in service')
  const users = await User.aggregate([
    {
      $match: {},
    },
    {
      $project: {
        username: 1,
        fullName: { firstName: 1, lastName: 1 },
        age: 1,
        email: 1,
        _id: 0,
        address: { city: 1, country: 1, street: 1 },
      },
    },
  ]);
  return users;
};

export const userServices = {
  createUserInDB,
  getAllUsersFromDB,
};
