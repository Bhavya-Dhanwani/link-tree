// Importing modules
import { Router } from "express";
import { loginUser, signupUser, getCurrentUser, logoutUser } from "../controllers/auth.controller.js";
import validateErrors from "../middlewares/validateErrors.middleware.js";
import protect from "../middlewares/auth.middleware.js";
import { sanitizeLogin, sanitizeSignup } from "../sanitizers/auth.sanitize.js";
import { loginValidator, signupValidator } from "../validators/auth.validate.js";

// Creating auth router
const router = Router();

// Creating signup route
router.post("/signup", signupValidator, validateErrors, sanitizeSignup, signupUser);

// Creating login route
router.post("/login", loginValidator, validateErrors, sanitizeLogin, loginUser);

// Getting current user (protected)
router.get("/me", protect, getCurrentUser);

// Logging out user
router.post("/logout", logoutUser);

// Exporting auth router
export default router;
