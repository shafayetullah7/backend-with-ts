import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const zodParsedUserData = userValidationSchema.parse(user);

    const newUser = await userServices.createUserInDB(zodParsedUserData);

    return res
      .status(200)
      .json({ success: true, message: "User created successfully!", data: newUser });
  } catch (error) {
    console.log((error as { message: string }).message);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

const getAllusers = async (req: Request, res: Response) => {
  // console.log("in controller");
  try {
    const users = await userServices.getAllUsersFromDB();
    return res
      .status(200)
      .json({ success: true, message: "Users fetched successfully!", data: users });
  } catch (error) {
    console.log((error as { message: string }).message);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

export const userControllers = {
  createUser,
  getAllusers,
};
