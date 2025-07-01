import { prisma } from "../../prisma/client";

export const SizeRepository = {
  async upsert(label: string) {
    try {
      const size = await prisma.size.upsert({
        where: { label },
        update: {},
        create: { label },
      });
      return size;
    } catch (error) {
      throw new Error(`Error upserting size`);
    }
  },
};
