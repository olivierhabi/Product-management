import { Router } from "express";
import UserController from "../controllers/UserController";
import validateUser from "../helpers/validator/SigninValidator";
import auth from "../middleware/Auth";

const { validate } = validateUser;
const router = Router();

router.post("/signup", auth, validate, UserController.AddUser);
router.post("/signin", validate, UserController.Login);

export default router;
