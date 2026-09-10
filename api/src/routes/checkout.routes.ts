import { Router } from "express";
import { createCheckout } from "../controllers/checkout.controller";

let router = Router();

router.post("/checkout", createCheckout);

export default router;