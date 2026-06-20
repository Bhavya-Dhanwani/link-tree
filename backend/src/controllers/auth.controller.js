// Importing modules
import { signupService } from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// Handling user signup
const signupUser = asyncWrapper(async (req, res) => {
    const result = await signupService(req.body);

    // setting the coookies in the response
    res.cookie("linkters", result.token, {

        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days

    });

    return ApiResponse(res, 201, "User registered successfully", result.user);
});

// Exporting auth controllers
export { signupUser };
