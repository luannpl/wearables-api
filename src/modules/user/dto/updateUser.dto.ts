import { z } from "zod";
import { UpdateUserSchema } from "../schemas/updateUser.schema";

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
