import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";
import { ProductController } from "./product.controller";
const router = Router();

router.get("/", ProductController.getAllProducts);
router.use(authenticate);


export default router;