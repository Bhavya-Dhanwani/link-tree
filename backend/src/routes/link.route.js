// Importing modules
import { Router } from "express";
import { createLink, getLinks, getMyLinks, getAllLinks, getDeletedLinks, deleteLink, hardDeleteLink } from "../controllers/link.controller.js";
import validateErrors from "../middlewares/validateErrors.middleware.js";
import protect from "../middlewares/auth.middleware.js";
import { createLinkValidator } from "../validators/link.validate.js";

// Creating link router
const router = Router();

// Creating a new link (protected)
router.post("/", protect, createLinkValidator, validateErrors, createLink);

// Getting active links for the logged-in user (protected)
router.get("/my", protect, getMyLinks);

// Getting all active links by username (public)
router.get("/user/:username", getLinks);

// Getting all links including soft-deleted (protected)
router.get("/all", protect, getAllLinks);

// Getting only deleted links (protected)
router.get("/deleted", protect, getDeletedLinks);

// Soft deleting a link (protected)
router.delete("/:id", protect, deleteLink);

// Hard deleting a link permanently (protected)
router.delete("/:id/hard", protect, hardDeleteLink);

// Exporting link router
export default router;
