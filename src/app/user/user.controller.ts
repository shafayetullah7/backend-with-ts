import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const zodParsedUserData = userValidationSchema.parse(user);

    const newUser = await userServices.createUserInDB(zodParsedUserData);

    return res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: newUser,
    });
  } catch (error) {
    console.log((error as { message: string }).message);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

const getAllusers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsersFromDB();
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: users,
    });
  } catch (error) {
    console.log((error as { message: string }).message);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userServices.getSingleUserFromDB(parseInt(userId));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: user,
    });
  } catch (error) {
    console.log((error as { message: string }).message);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const existingUser = await User.isUserExists(parseInt(userId));

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    await userServices.deleteUserFromDB(parseInt(userId));
    return res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    console.log((error as { message: string }).message);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const existingUser = await User.isUserExists(parseInt(userId));
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    const updateData = req.body;
    const updatedUser = await userServices.updateUserInDB(
      parseInt(userId),
      updateData
    );
    return res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.log((error as { message: string }).message);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const userControllers = {
  createUser,
  getAllusers,
  getSingleUser,
  deleteUser,
  updateUser
};
