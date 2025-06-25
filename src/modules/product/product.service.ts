import { BadRequestError } from "../../errors/HttpErrors";
import { CreateProductDto } from "./dto/createProduct.dto";
import { ProductRepository } from "./product.repository";

export const ProductService = {
    async getAllProducts() {
        try {
            const products = await ProductRepository.findAll();
            return products;
        } catch (error) {
            throw new Error("Error fetching products");
        }
    },

    async createProduct(productData: CreateProductDto) {
        try {
            const newProduct = await ProductRepository.create(productData);
            if (!newProduct) {
                throw new BadRequestError("Product creation failed");
            }
            return newProduct;
        } catch (error) {
            throw new Error("Error creating product");
        }
    }
};