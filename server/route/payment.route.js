import express from "express";
import { payment, isSubcribe } from "../controller/payment.controller.js";

const router = express.Router();

router.post('/create-checkout-session', payment);
router.post('/update-subscription-status', isSubcribe);

export default router;
