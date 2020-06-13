import { Router } from "express";
import ProductController from "../controllers/ProductController";
import validateProduct from "../helpers/validator/ProductValidator";
import auth from "../middleware/Auth";

const { validate } = validateProduct;

const router = Router();

router.post("/create", auth, validate, ProductController.Create);
router.patch("/update/:id", auth, validate, ProductController.Update);
router.delete("/delete/:id", auth, ProductController.Delete);

export default router;
