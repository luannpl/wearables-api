import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { CreateUserSchema } from "./schemas/createUser.schema";
import { LoginSchema } from "./schemas/login.schema";
import { authenticate } from "../../middlewares/authenticate";
import { UserController } from "./user.controller";
import { upload } from "../../middlewares/uploadMiddleware";
import { UpdateUserSchema } from "./schemas/updateUser.schema";

const router = Router();

router.post(
  "/",
  upload.single("avatar"),
  validate(CreateUserSchema),
  UserController.createUser
);
router.post("/login", validate(LoginSchema), UserController.login);

router.use(authenticate);
router.get("/me", UserController.getCurrentUser);
router.get("/", UserController.getAllUsers);
router.put(
  "/:id",
  upload.single("avatar"),
  validate(UpdateUserSchema),
  UserController.updateUser
);
router.delete("/:id", UserController.deleteUser);

export default router;
