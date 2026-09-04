import { Router } from "express";
import { getProducts } from "../controllers/products.controller";

const router = Router();

router.get("/products{/:id}", getProducts);

export default router;