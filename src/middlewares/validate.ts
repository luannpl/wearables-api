import { ZodSchema } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = result.error.format();
      const errors = Object.entries(formattedErrors)
        .filter(([key]) => key !== "_errors")
        .map(([key, value]: any) => ({
          field: key,
          message: value?._errors?.[0] ?? "Erro de validação",
        }));

      res.status(400).json({
        message: "Validation error",
        errors,
      });
      return;
    }

    req.body = result.data;
    next();
  };
};
