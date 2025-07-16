const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(200, { message: "Username must not exceed 200 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email()
    .refine((val) => val.includes("@"), {
      message: "Invalid email address",
    }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .refine(val => val.trim() !== "", { message: "Phone number cannot be empty" })
    .min(6, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must not exceed 15 digits" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(4, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password must not exceed 255 characters" }),
});

module.exports = signupSchema;
