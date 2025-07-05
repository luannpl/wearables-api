import { BadRequestError } from "../../errors/HttpErrors";
import { prisma } from "../../prisma/client";
import { CategoryRepository } from "../category/category.repository";
import { UserRepository } from "../user/user.repository";
import { CreateProductDto } from "./dto/createProduct.dto";
import { ProductRepository } from "./product.repository";
import { SizeRepository } from "../size/size.repository";
import { ProductSizeRepository } from "../productSize/productSize.repository";
import { Readable } from "stream";
import pinata from "../../lib/pinata";

export const ProductService = {
  async getAllProducts() {
    try {
      const products = await ProductRepository.findAll();
      return products;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  },
  async getProductById(id: string) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new BadRequestError("Product not found");
    }
    return product;
  },

  async createProduct(
    productData: CreateProductDto,
    file?: Express.Multer.File
  ) {
    const category = await CategoryRepository.upsert(productData.category);
    const user = await UserRepository.findById(productData.registredById);
    if (!user) {
      throw new BadRequestError("User not exists");
    }
    if (file) {
      const stream = Readable.from(file.buffer);
      const metadata = {
        name: `product-${productData.name}-${Date.now()}-${file.originalname}`,
      };

      const result = await pinata.pinFileToIPFS(stream, {
        pinataMetadata: metadata,
      });

      if (!result || !result.IpfsHash) {
        throw new BadRequestError("Error uploading avatar to IPFS");
      }

      productData.productImage = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
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
        const size = await SizeRepository.upsert(label);
        if (!size) {
          throw new BadRequestError(`Size ${label} could not be created`);
        }

        // Cria a associação ProductSize com o estoque
        await ProductSizeRepository.create({
          productId: newProduct.id,
          sizeId: size.id,
          stock,
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

  async deleteProduct(id: string) {
    const product = await ProductRepository.findById(id);

    if (!product) {
      throw new BadRequestError("Product not found");
    }

    await ProductRepository.delete(id);
    return { message: "Product deleted successfully" };
  },
};
