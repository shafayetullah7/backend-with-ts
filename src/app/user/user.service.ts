import { Tuser } from "./user.interface";
import { User } from "./user.model";
// import bcrypt from "bcrypt";

const createUserInDB = async (user: Tuser) => {
  const newUser = await User.create(user);
  return newUser;
};

const getAllUsersFromDB = async () => {
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

const getSingleUserFromDB = async (userId:number) =>{
  // const user = await User.findOne({userId},{_id:0, fullName:{firstName:1,lastName:1},address:{city:1,country:1,street:1}});
  const existingUser = await User.isUserExists(userId);
  return existingUser;
}

export const userServices = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB
};
