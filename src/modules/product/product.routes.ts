import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";
import { ProductController } from "./product.controller";
import { CreateProductSchema } from "./schemas/createProduct.schema";
const router = Router();

router.get("/", ProductController.getAllProducts);
router.delete("/:id", ProductController.deleteProduct);
router.use(authenticate);
router.post(
  "/",
  validate(CreateProductSchema),
  ProductController.createProduct
);

export default router;
