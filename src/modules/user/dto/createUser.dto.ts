import { z } from "zod";
import { CreateUserSchema } from "../schemas/createUser.schema";

export type CreateUserDto = z.infer<typeof CreateUserSchema>;