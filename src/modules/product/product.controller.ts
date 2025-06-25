import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpErrors";
import { ProductService } from "./product.service";

export const ProductController = {
    async getAllProducts(_: Request, res: Response): Promise<void> {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};