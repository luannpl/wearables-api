import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/client";

export const ProductRepository = {
  async findAll() {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
        },
      });
      return products;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  },

  async create(data: Prisma.ProductCreateInput) {
    try {
      const newProduct = await prisma.product.create({
        data,
      });
      return newProduct;
    } catch (error) {
      throw new Error("Error creating product");
    }
  },
};
