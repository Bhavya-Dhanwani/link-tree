// Importing modules
import { Router } from "express";
import { createLink } from "../controllers/link.controller.js";
import validateErrors from "../middlewares/validateErrors.middleware.js";
import protect from "../middlewares/auth.middleware.js";
import { createLinkValidator } from "../validators/link.validate.js";

// Creating link router
const router = Router();

// Creating a new link (protected)
router.post("/", protect, createLinkValidator, validateErrors, createLink);

// Exporting link router
export default router;
