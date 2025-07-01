import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  discount: z
    .number()
    .min(0, "Discount must be a non-negative number")
    .optional()
    .default(0),
  category: z.string().min(1, "Category name is required"),
  registredById: z.string().uuid("Invalid user ID format"),
  updatedById: z.string().uuid("Invalid user ID format").optional(),
  sizes: z
    .array(
      z.object({
        label: z.string().min(1, "Size label is required"),
        stock: z.number().min(0, "Stock must be a non-negative number"),
      })
    )
    .min(1)
    .nonempty("At least one size is required"),
});
