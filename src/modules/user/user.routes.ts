import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { CreateUserSchema } from "./schemas/createUser.schema";
import { LoginSchema } from "./schemas/login.schema";
import { authenticate } from "../../middlewares/authenticate";
import { UserController } from "./user.controller";
import { upload } from "../../middlewares/uploadMiddleware";

const router = Router();

router.post("/", upload.single('avatar'), validate(CreateUserSchema),  UserController.createUser);
router.post("/login", validate(LoginSchema), UserController.login);

router.get("/me", authenticate, UserController.getCurrentUser);
router.get("/", authenticate, UserController.getAllUsers);
router.delete("/:id", authenticate, UserController.deleteUser);

export default router;
