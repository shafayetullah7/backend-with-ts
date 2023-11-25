import mongoose from "mongoose";
import { Tadress, TfullName, Torder, Tuser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../config";

const fullNameSchema = new mongoose.Schema<TfullName>({
  firstName: {
    type: String,
    required: [true, "FirstName is required"],
    minlength:[1,'Firstname must contain at least one character'],
    maxlength:[20,'Firstname cannot be more than 20 characters']
  },
  lastName: {
    type: String,
    required: [true, "LastName is required"],
    minlength:[1,'Lastname must contain at least one character'],
    maxlength:[20,'Lastname cannot be more than 20 characters']
  },
});

const addressSchema = new mongoose.Schema<Tadress>({
  street: {
    type: String,
    required: [true, "Address street is required"],
    minlength:[1,'Address street must contain at least one character'],
    maxlength:[20,'Address street cannot be more than 20 characters']
  },
  city: {
    type: String,
    required: [true, "Address city is required"],
    minlength:[1,'Address city must contain at least one character'],
    maxlength:[20,'Address city cannot be more than 20 characters']
  },
  country: {
    type: String,
    required: [true, "Address country is required"],
    minlength:[1,'Address country must contain at least one character'],
    maxlength:[20,'Address country cannot be more than 20 characters']
  },
});

const orderSchema = new mongoose.Schema<Torder>({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    minlength:[1,'Product must contain at least one character'],
    maxlength:[20,'Product cannot be more than 20 characters']
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min:[0,'Price cannot be less than 0'],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
    min:[1,'Price cannot be less than 1'],
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
    minlength:[1,'Username must contain at least one character'],
    maxlength:[20,'Username cannot be more than 20 characters']
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength:[6,'Username must contain at least 6 character'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, "Fullname is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min:[18,'Price cannot be less than 18'],
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

userSchema.pre('save',async function(next){
  this.password = await bcrypt.hash(this.password,Number(config.bcrypt_salt_rounds));
  next();
})

export const User = mongoose.model<Tuser>("User", userSchema);
