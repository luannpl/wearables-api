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
};