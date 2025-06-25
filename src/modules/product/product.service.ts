import { BadRequestError } from "../../errors/HttpErrors";
import { CategoryRepository } from "../category/category.repository";
import { UserRepository } from "../user/user.repository";
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
        console.log(productData)
        const category = await CategoryRepository.upsert(productData.category);
        const user = await UserRepository.findById(productData.registredById);
        if(!user){
            throw new BadRequestError("User not exists")
        }
        
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