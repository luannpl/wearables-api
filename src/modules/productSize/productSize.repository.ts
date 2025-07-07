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

  async upsert(data: CreateProductSizeDto) {
    try {
      const productSize = await prisma.productSize.upsert({
        where: {
          productId_sizeId: {
            productId: data.productId,
            sizeId: data.sizeId,
          },
        },
        update: { stock: data.stock },
        create: data,
      });
      return productSize;
    } catch (error) {
      throw new Error("Error upserting product size");
    }
  }
};
