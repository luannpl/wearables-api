import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";
import { ProductController } from "./product.controller";
import { CreateProductSchema } from "./schemas/createProduct.schema";
import { upload } from "../../middlewares/uploadMiddleware";
import { UpdateProductSchema } from "./schemas/updateProduct.schema";
const router = Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.delete("/:id", ProductController.deleteProduct);
router.use(authenticate);
router.post(
  "/",
  upload.single("productImage"),
  validate(CreateProductSchema),
  ProductController.createProduct
);
router.put(
  "/:id",
  upload.single("productImage"),
  validate(UpdateProductSchema),
  ProductController.updateProduct
);

export default router;

