import { prisma } from "../../prisma/client";

export const CategoryRepository = {
    async upsert(name: string) {
        try {
            const category = await prisma.category.upsert({
                where: { name },
                update: {},
                create: { name },
            });
            return category;
        } catch (error: any) {
            throw new Error(`Error upserting category: ${error.message}`);
        }
    }
};