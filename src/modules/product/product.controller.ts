import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpErrors";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/createProduct.dto";

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

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.status(200).json(product);
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
      const productData: CreateProductDto = req.body;
      const newProduct = await ProductService.createProduct(
        productData,
        req.file as Express.Multer.File | undefined
      );
      res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const updatedProduct = await ProductService.updateProduct(
        req.params.id,
        req.body,
        req.file as Express.Multer.File | undefined
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
