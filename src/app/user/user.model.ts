import mongoose from "mongoose";
import { Tadress, TfullName, Torder, Tuser } from "./user.interface";

const fullNameSchema = new mongoose.Schema<TfullName>({
  firstName: {
    type: String,
    required: [true, "FirstName is required"],
  },
  lastName: {
    type: String,
    required: [true, "LastName is required"],
  },
});

const addressSchema = new mongoose.Schema<Tadress>({
  street: {
    type: String,
    required: [true, "Address street is required"],
  },
  city: {
    type: String,
    required: [true, "Address city is required"],
  },
  country: {
    type: String,
    required: [true, "Address country is required"],
  },
});

const orderSchema = new mongoose.Schema<Torder>({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
  },
});

const userSchema = new mongoose.Schema<Tuser>({
  userId: {
    type: Number,
    required: [true, "UserId is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, "Fullname is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: addressSchema,
    required: [true, "Address is required"],
  },
  orders: {
    type: [orderSchema],
  },
});

export const User = mongoose.model<Tuser>("User", userSchema);
