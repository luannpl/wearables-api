import { prisma } from "../../prisma/client";
import { CreateProductSizeDto } from "./dto/createProductSize.dto";

export const ProductSizeRepository = {
  async create(data: CreateProductSizeDto) {
    try {
      const productSize = await prisma.productSize.create({
        data,
      });
      return productSize;
    } catch (error) {
      throw new Error("Error creating product size");
    }
  },
};
