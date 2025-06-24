import { Router } from "express";
import { UserController } from "./user.controller";
import { validate } from "../../middlewares/validate";
import { CreateUserSchema } from "./dto/createUser.schema";
import { LoginSchema } from "./dto/login.schema";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.post("/", validate(CreateUserSchema), UserController.createUser);
router.post("/login", validate(LoginSchema), UserController.login);
router.get("/", authenticate ,UserController.getAllUsers);
router.delete("/:id", authenticate,UserController.deleteUser);

export default router;
