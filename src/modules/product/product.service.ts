import { ProductRepository } from "./product.repository";

export const ProductService = {
    async getAllProducts() {
        try {
            const products = await ProductRepository.findAll();
            return products;
        } catch (error) {
            throw new Error("Error fetching products");
        }
    }
};