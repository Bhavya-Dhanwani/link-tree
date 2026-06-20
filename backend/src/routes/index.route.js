// Importing modules
import { Router } from "express";
import authRouter from "./auth.route.js";

// Creating main router
const router = Router();

// Setting up auth routes
router.use("/auth", authRouter);

// Exporting main router
export default router;
