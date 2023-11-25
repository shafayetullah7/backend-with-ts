import { Tuser } from "./user.interface";
import { User } from "./user.model";
// import bcrypt from "bcrypt";

const createUserInDB = async (user: Tuser) => {
  // const hashedPass = await bcrypt.hash(user.password, 10);
  // const newUser = await User.create({ ...user, password: hashedPass });
  const newUser = await User.create(user);
  return newUser;
  // try {
  //     const hashedPass = await bcrypt.hash(user.password,10);
  //     const newUser = await User.create({...user,password:hashedPass});
  //     return newUser;
  // } catch (error) {
  //     // console.log('in service ',(error as {message:string}).message);
  //     throw new Error((error as {message:string}).message);
  // }
};

export const userServices = {
  createUserInDB,
};
