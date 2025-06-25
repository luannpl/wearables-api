import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().min(0, "Price must be a positive number"),
    stock: z.number().min(0, "Stock must be a non-negative number"),
    discount: z.number().min(0, "Discount must be a non-negative number").optional().default(0),
    category: z.string().min(1, "Category name is required"), // <- mudou aqui
    registredById: z.string().min(1, "Registered By ID is required"),
    updatedById: z.string().optional(),
    sizes: z.array(z.string().min(1)).nonempty("At least one size is required")
});
