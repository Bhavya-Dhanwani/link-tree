// Importing modules
import { Router } from "express";
import { signupUser } from "../controllers/auth.controller.js";
import validateErrors from "../middlewares/validateErrors.middleware.js";
import { signupValidator } from "../validators/auth.validate.js";

// Creating auth router
const router = Router();

// Creating signup route
router.post("/signup", signupValidator, validateErrors, signupUser);

// Exporting auth router
export default router;
