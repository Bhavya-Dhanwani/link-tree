// Importing modules
import { Router } from "express";
import { recordClick, getClickAnalyticsByUser } from "../controllers/clickCount.controller.js";
import protect from "../middlewares/auth.middleware.js";

// Creating click count router
const router = Router();

// Recording a click (public)
router.post("/:linkId", recordClick);

// Getting click analytics for a user (protected)
router.get("/user/:username", protect, getClickAnalyticsByUser);

// Exporting click count router
export default router;
