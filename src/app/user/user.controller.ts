import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const newUser = await userServices.createUserInDB(user);
    return res
      .status(200)
      .json({ success: true, message: "New user created", data: newUser });
  } catch (error) {
    console.log((error as { message: string }).message);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const userControllers = {
  createUser,
};
