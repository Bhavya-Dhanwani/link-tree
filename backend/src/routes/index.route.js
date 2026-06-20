// Importing modules
import { Router } from "express";
import authRouter from "./auth.route.js";
import linkRouter from "./link.route.js";

// Creating main router
const router = Router();

// Setting up auth routes
router.use("/auth", authRouter);

// Setting up link routes
router.use("/links", linkRouter);

// Exporting main router
export default router;
