// Importing modules
import { createUser, findUserByEmail } from "../dao/user.dao.js";
import ApiError from "../utils/ApiError.js";

// Creating signup service
async function signupService(payload = {}) {
    const { name, email, password } = payload;

    // Preparing user fields
    const trimmedName = name.trim();
    const trimmedEmail = email.toLowerCase().trim();

    // Checking existing user
    const existingUser = await findUserByEmail(trimmedEmail);

    if (existingUser) {
        throw new ApiError(409, "User already exists with this email");
    }

    // Creating new user
    const user = await createUser({
        name : trimmedName,
        email : trimmedEmail,
        password
    });

    // Creating single auth token
    const token = user.generateToken();

    return {
        user,
        token
    };
}

// Exporting auth services
export { signupService };
