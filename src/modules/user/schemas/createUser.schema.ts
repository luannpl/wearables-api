import { z } from 'zod';
import { Role } from '@prisma/client';

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  avatarUrl: z.string().optional(),
  role: z.nativeEnum(Role),
});


