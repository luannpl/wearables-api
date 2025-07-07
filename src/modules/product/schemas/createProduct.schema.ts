import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }).min(1, "Name is required"),
  description: z.string().optional(),
  productImage: z.string().optional(),
  price: z.coerce.number({
    required_error: "Price is required",
  }).min(0, "Price must be a positive number"),
  discount: z.coerce
    .number()
    .min(0, "Discount must be a non-negative number")
    .optional()
    .default(0),
  category: z.string({
    required_error: "Category is required",
  }).min(1, "Category name is required"),
  registredById: z.string({
    required_error: "Registred by is required",
  }).uuid("Invalid user ID format"),
  updatedById: z.string().uuid("Invalid user ID format").optional(),

  // 👇 transform para fazer parse se vier como string JSON
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
          label: z.string({
            required_error: "Size label is required",
          }).min(1, "Size label is required"),
          stock: z.coerce
            .number({
              required_error: "Stock is required",
            })
            .min(0, "Stock must be a non-negative number"),
        })
      ),
    ])
    .transform((val) => {
      // Força a validar o array depois do parse
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
