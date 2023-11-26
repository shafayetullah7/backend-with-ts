import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";
import { User } from "./user.model";
import { Torder } from "./user.interface";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // validate body data with zod
    const zodParsedUserData = userValidationSchema.parse(userData);

    // check if user exists
    const existingUser = await User.isUserExists({
      userId: parseInt(userData.userId),
      username: userData.username,
    });

    // new user should not be created with existing username of userId
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

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
      .json({ success: false, message: "Something went wrong" });
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
    const existingUser = await User.isUserExists({ userId: parseInt(userId) });

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

    // check if user exists
    const existingUser = await User.isUserExists({ userId: parseInt(userId) });
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

const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // check if user exists
    const existingUser = await User.isUserExists({ userId: parseInt(userId) });
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

    const order: Torder = req.body;
    await userServices.addOrderToUserInDB(parseInt(userId), order);
    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    console.log((error as { message: string }).message);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const getAllOrdersOfUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // check if user exists
    const existingUser = await User.isUserExists({ userId: parseInt(userId) });
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
    const orders = await userServices.getAllOrdersOfUserFromDB(
      parseInt(userId)
    );
    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: orders,
    });
  } catch (error) {
    console.log((error as { message: string }).message);
    // console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // check if user exists
    const existingUser = await User.isUserExists({ userId: parseInt(userId) });
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

    const result = await userServices.getTotalPriceOfAllOrderOfUser(
      parseInt(userId)
    );
    return res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: { totalPrice: result.totalPrice },
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
  updateUser,
  addOrder,
  getAllOrdersOfUser,
  getTotalPrice,
};
