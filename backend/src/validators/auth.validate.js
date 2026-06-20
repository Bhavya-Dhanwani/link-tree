// Importing modules
import { body } from "express-validator";
import ApiError from "../utils/ApiError.js";

// Validating signup request body
const signupValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Email must be valid"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

// Validating login request body
const loginValidator = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Email must be valid"),

    body("password")
        .notEmpty()
        .withMessage("Password cannot be empty"),
];

// Exporting auth validators
export {
    loginValidator,
    signupValidator
};
