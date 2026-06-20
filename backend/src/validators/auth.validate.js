// Importing modules
import { body } from "express-validator";

// Validating signup request body
const signupValidator = [
    body().custom((_value, { req }) => {
        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            throw new Error("Name, email, and password are required");
        }

        return true;
    }),

    body().custom((_value, { req }) => {
        const { name, email, password } = req.body || {};

        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            throw new Error("Name, email, and password must be valid strings");
        }

        return true;
    }),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name and email cannot be empty"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Name and email cannot be empty")
        .isEmail()
        .withMessage("Email must be valid"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

// Validating login request body
const loginValidator = [
    body().custom((_value, { req }) => {
        const { email, password } = req.body || {};

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        return true;
    }),

    body().custom((_value, { req }) => {
        const { email, password } = req.body || {};

        if (typeof email !== "string" || typeof password !== "string") {
            throw new Error("Email and password must be valid strings");
        }

        return true;
    }),

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
