-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_registredById_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "registredById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_registredById_fkey" FOREIGN KEY ("registredById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
