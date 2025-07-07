import { z } from "zod";

const BaseUpdateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  productImage: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  discount: z.coerce.number().min(0, "Discount must be a non-negative number").default(0),
  category: z.string().min(1, "Category name is required"),
  registredById: z.string().uuid("Invalid user ID format"),
  updatedById: z.string().uuid("Invalid user ID format").optional(),

  sizes: z
    .union([
      z.string().transform((val, ctx) => {
        try {
          const parsed = JSON.parse(val);
          return parsed;
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid sizes JSON format",
          });
          return z.NEVER;
        }
      }),
      z.array(
        z.object({
          label: z.string().min(1, "Size label is required"),
          stock: z.coerce.number().min(0, "Stock must be a non-negative number"),
        })
      ),
    ])
    .transform((val) => {
      return z
        .array(
          z.object({
            label: z.string().min(1),
            stock: z.number().min(0),
          })
        )
        .parse(val);
    }),
});

// 👇 Torna todos os campos opcionais
export const UpdateProductSchema = BaseUpdateProductSchema.partial();
