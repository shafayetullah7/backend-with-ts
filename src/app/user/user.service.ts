/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../config";
import { Torder, Tuser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const createUserInDB = async (user: Tuser) => {
  const newUser = await User.create(user);
  if (!newUser) {
    return newUser;
  }
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...data } = newUser.toObject();
  return data;
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
        address: 1,
      },
    },
  ]);
  return users;
};

const getSingleUserFromDB = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);
  return existingUser;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  console.log(result);
  return result;
};

const updateUserInDB = async (userId: number, updateData: Tuser) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(
      updateData.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  const updatedUser = await User.findOneAndUpdate({ userId }, updateData, {
    new: true,
  });
  if (updatedUser) {
    // eslint-disable-next-line no-unused-vars
    const { password, ...data } = updatedUser.toObject();
    return data;
  }
  return updatedUser;
};


const addOrderToUserInDB = async (userId:number,order:Torder) => {
  const user = await User.findOne({userId});
  user?.orders.push(order);
  await user?.save();
}


const getAllOrdersOfUserFromDB = async (userId:number) => {
  const user = await User.findOne({userId},{orders:1,_id:0});
  return user;
}

const getTotalPriceOfAllOrderOfUser = async(userId:number) =>{
  const result = await User.aggregate([
    {$match:{userId}},
    {$unwind:'$orders'},
    {$group:{
      _id:'$_id',
      totalPrice:{$sum:'$orders.price'}
    }},
    {$project:{_id:0,totalPrice:1}}
  ]);
  return result[0] || {totalPrice:0};
}

export const userServices = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserInDB,
  addOrderToUserInDB,
  getAllOrdersOfUserFromDB,
  getTotalPriceOfAllOrderOfUser
};
