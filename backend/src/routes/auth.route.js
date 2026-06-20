// Importing modules
import { Router } from "express";
import { loginUser, signupUser } from "../controllers/auth.controller.js";
import validateErrors from "../middlewares/validateErrors.middleware.js";
import { sanitizeLogin, sanitizeSignup } from "../sanitizers/auth.sanitize.js";
import { loginValidator, signupValidator } from "../validators/auth.validate.js";

// Creating auth router
const router = Router();

// Creating signup route
router.post("/signup", signupValidator, validateErrors, sanitizeSignup, signupUser);

// Creating login route
router.post("/login", loginValidator, validateErrors, sanitizeLogin, loginUser);

// Exporting auth router
export default router;
