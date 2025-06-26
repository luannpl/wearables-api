import { z } from "zod";
import { CreateProductSchema } from "../schemas/createProduct.schema";

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
