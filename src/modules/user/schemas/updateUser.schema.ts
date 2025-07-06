import { z } from "zod";
import { Role } from "@prisma/client";

export const UpdateUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, "Username is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format")
    .min(1, "Email is required"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  avatarUrl: z.string().optional(),
  role: z.nativeEnum(Role, {
    required_error: "Role is required",
    invalid_type_error: "Invalid role value",
  }),
});
