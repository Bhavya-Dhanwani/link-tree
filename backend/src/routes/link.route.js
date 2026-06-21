// Importing modules
import { Router } from "express";
import { createLink, getLinks, getMyLinks, getAllLinks, getDeletedLinks, deleteLink, hardDeleteLink, restoreLink, reorderLinks } from "../controllers/link.controller.js";
import validateErrors from "../middlewares/validateErrors.middleware.js";
import protect from "../middlewares/auth.middleware.js";
import { createLinkValidator } from "../validators/link.validate.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";

// Creating link router
const router = Router();

// Public: 100 requests per 5 minutes per IP
const publicLimiter = rateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 100,
    blockDuration: 5 * 60 * 1000,
    message: "Too many requests. Try again later.",
});

// Protected dashboard: 500 requests per 500 minutes per IP
const dashboardLimiter = rateLimiter({
    windowMs: 500 * 60 * 1000,
    max: 500,
    blockDuration: 5 * 60 * 1000,
    message: "Too many requests. Try again later.",
});

// Creating a new link (protected)
router.post("/", protect, dashboardLimiter, createLinkValidator, validateErrors, createLink);

// Getting active links for the logged-in user (protected)
router.get("/my", protect, dashboardLimiter, getMyLinks);

// Getting all active links by username (public)
router.get("/user/:username", publicLimiter, getLinks);

// Getting all links including soft-deleted (protected)
router.get("/all", protect, dashboardLimiter, getAllLinks);

// Getting only deleted links (protected)
router.get("/deleted", protect, dashboardLimiter, getDeletedLinks);

// Soft deleting a link (protected)
router.delete("/:id", protect, dashboardLimiter, deleteLink);

// Hard deleting a link permanently (protected)
router.delete("/:id/hard", protect, dashboardLimiter, hardDeleteLink);

// Restoring a soft-deleted link (protected)
router.patch("/:id/restore", protect, dashboardLimiter, restoreLink);

// Reordering links (protected)
router.put("/reorder", protect, dashboardLimiter, reorderLinks);

// Exporting link router
export default router;
