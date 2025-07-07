import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/client";
import { BadRequestError } from "../../errors/HttpErrors";

export const ProductRepository = {
  async findAll() {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: {
            select: {
              name: true,
            },
          },
          sizes: {
            select: {
              stock: true,
              size: {
                select: {
                  id: true,
                  label: true,
                },
              },
            },
          },
          registredBy: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
        },
      });
      return products;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  },

  async findById(id: string) {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          sizes: {
            select: {
              stock: true,
              size: {
                select: {
                  id: true,
                  label: true,
                },
              },
            },
          },
          registredBy: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
        },
      });

      return product; // Retorna null se não encontrar
    } catch (error) {
      throw new Error("Error fetching product");
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

  async update(id: string, data: Prisma.ProductUpdateInput) {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data,
      });
      return updatedProduct;
    } catch (error) {
      throw new Error("Error updating product");
    }
  },

  async delete(id: string) {
    try {
      const deletedProduct = await prisma.product.delete({
        where: { id },
      });
      if (!deletedProduct) {
        throw new BadRequestError("Product not found");
      }
      return deletedProduct;
    } catch (error) {
      throw new Error("Error deleting product");
    }
  },
};
