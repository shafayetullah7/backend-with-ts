import { z } from "zod";

const fullNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be string",
    })
    .min(1)
    .max(20),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be string",
    })
    .min(1)
    .max(20),
});

const addressValidationSchema = z.object({
  street: z
    .string({
      required_error: "Street name is required",
      invalid_type_error: "Street name must be string",
    })
    .min(1)
    .max(20),
  city: z
    .string({
      required_error: "City name is required",
      invalid_type_error: "City name must be string",
    })
    .min(1)
    .max(20),
  country: z
    .string({
      required_error: "Country name is required",
      invalid_type_error: "Country name must be string",
    })
    .min(1)
    .max(20),
});

const orderValidationSchema = z.object({
  productName: z
    .string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be string",
    })
    .min(1)
    .max(20),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be number",
    })
    .min(0),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be number",
    })
    .min(1),
});

export const userValidationSchema = z.object({
  userId: z.number({
    required_error: "userId is required",
    invalid_type_error: "userId must be number",
  }),
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be string",
    })
    .min(1)
    .max(20),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Price must be string",
    })
    .min(6),
  fullName: fullNameValidationSchema,
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be number",
    })
    .min(18),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email({ message: "Invalid email format" }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).min(0),
});

export default userValidationSchema;
