// Importing modules
import { loginService, signupService } from "../services/auth.service.js";
import { sanitizeAuthUserResponse } from "../sanitizers/auth.sanitize.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import setAuthCookie from "../utils/setCookie.js";
import clearAuthCookie from "../utils/clearCookie.js";

// Handling user signup
const signupUser = asyncWrapper(async (req, res) => {
    const result = await signupService(req.body);

    // Setting the cookies in the response
    setAuthCookie(res, result.token);

    return ApiResponse(res, 201, "User registered successfully", sanitizeAuthUserResponse(result.user));
});

// Handling user login
const loginUser = asyncWrapper(async (req, res) => {
    const result = await loginService(req.body);

    // Setting the cookies in the response
    setAuthCookie(res, result.token);

    return ApiResponse(res, 200, "User logged in successfully", sanitizeAuthUserResponse(result.user));
});

// Getting current user
const getCurrentUser = asyncWrapper(async (req, res) => {
    return ApiResponse(res, 200, "User fetched successfully", sanitizeAuthUserResponse(req.user));
});

// Handling user logout
const logoutUser = asyncWrapper(async (req, res) => {
    clearAuthCookie(res);
    return ApiResponse(res, 200, "User logged out successfully");
});

// Exporting auth controllers
export {
    loginUser,
    signupUser,
    getCurrentUser,
    logoutUser,
};
