import { Router } from "express";
import { UserController } from "./user.controller";
import { validate } from "../../middlewares/validate";
import { CreateUserSchema } from "./dto/createUser.schema";

const router = Router();

router.post('/', validate(CreateUserSchema), UserController.createUser);
router.get("/", UserController.getAllUsers);

export default router;