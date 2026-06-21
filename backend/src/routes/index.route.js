import { Router } from "express";
import authRouter from "./auth.route.js";
import linkRouter from "./link.route.js";
import clickCountRouter from "./clickCount.route.js";
import paymentRouter from "./payment.route.js";
import platformRouter from "./platform.route.js";
import faviconRouter from "./favicon.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/links", linkRouter);
router.use("/clicks", clickCountRouter);
router.use("/payments", paymentRouter);
router.use("/platforms", platformRouter);
router.use("/favicon", faviconRouter);

export default router;
