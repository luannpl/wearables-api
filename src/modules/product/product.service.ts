import { BadRequestError } from "../../errors/HttpErrors";
import { prisma } from "../../prisma/client";
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
    console.log(productData);
    const category = await CategoryRepository.upsert(productData.category);
    const user = await UserRepository.findById(productData.registredById);
    if (!user) {
      throw new BadRequestError("User not exists");
    }
    productData.category = category.id;
    const { sizes, category: categoryId, registredById, ...rest } = productData;
    if (!categoryId) {
      throw new BadRequestError("Category is required");
    }
    if (!registredById) {
      throw new BadRequestError("RegistredById is required");
    }
    try {
      const newProduct = await ProductRepository.create({
        ...rest,
        category: {
          connect: { id: categoryId },
        },
        registredBy: {
          connect: { id: registredById },
        },
      });
      if (!newProduct) {
        throw new BadRequestError("Product creation failed");
      }
      for (const { label, stock } of sizes) {
        // Garante que o tamanho exista
        const size = await prisma.size.upsert({
          where: { label },
          update: {},
          create: { label },
        });

        // Cria a associação ProductSize com o estoque
        await prisma.productSize.create({
          data: {
            productId: newProduct.id,
            sizeId: size.id,
            stock,
          },
        });
      }
      const productWithSizes = await prisma.product.findUnique({
        where: { id: newProduct.id },
        include: {
          category: true,
          sizes: {
            include: {
              size: true,
            },
          },
        },
      });

      return productWithSizes;
    } catch (error) {
      throw new Error("Error creating product");
    }
  },
};
