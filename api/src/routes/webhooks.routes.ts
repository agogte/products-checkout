import { Router, raw } from "express";
import { handleStripeWebhook } from "../controllers/webhooks.controller";

const router = Router();

router.post("/webhook/stripe", raw({ type: "application/json" }), handleStripeWebhook);

export default router;