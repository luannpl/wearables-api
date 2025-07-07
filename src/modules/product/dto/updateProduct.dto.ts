import { z } from "zod";
import { UpdateProductSchema } from "../schemas/updateProduct.schema";

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
