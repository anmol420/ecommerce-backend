import * as z from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character",
  );

const genderEnum = z.enum(["male", "female", "other", "prefer_not_to_say"]);

export const RegisterUserRequest = z.object({
  email: z.email("Invalid email"),
  password: passwordSchema,
  firstName: z
    .string()
    .min(3, "First name should be atleast 3 characters long"),
  lastName: z.string().optional(),
  phoneNumber: z.string().min(10).max(10).regex(/^\d+$/, "Invalid phone number"),
  gender: genderEnum,
});
