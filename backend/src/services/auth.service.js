// Importing modules
import { createUser, findUserByEmail, findUserByEmailWithPassword, findUserByName } from "../dao/user.dao.js";
import ApiError from "../utils/ApiError.js";

// Creating signup service
async function signupService(payload = {}) {
    const { name, email, password } = payload;

    // Checking existing user
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new ApiError(409, "User already exists with this email");
    }

    // Creating new user
    const user = await createUser({
        name,
        email,
        password
    });

    // Creating single auth token
    const token = user.generateToken();

    return {
        user,
        token
    };
}

// Creating login service
async function loginService(payload = {}) {
    const { email, password } = payload;

    // Checking user credentials
    const user = await findUserByEmailWithPassword(email);

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Creating single auth token
    const token = user.generateToken();

    user.password = undefined;

    return {
        user,
        token
    };
}

// Reserved usernames that cannot be used
const RESERVED_USERNAMES = [
    "admin", "api", "login", "signup", "auth", "dashboard",
    "settings", "profile", "user", "users", "link", "links",
    "clicks", "analytics", "health", "test", "root", "system",
];

// Checking if username is available
async function checkUsernameService(username) {
    // Checking format: 3-20 chars, alphanumeric only
    if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
        return { available: false, reason: "Username must be 3-20 characters, alphanumeric only" };
    }

    // Checking reserved words
    if (RESERVED_USERNAMES.includes(username.toLowerCase())) {
        return { available: false, reason: "This username is reserved" };
    }

    // Checking database
    const user = await findUserByName(username);
    return { available: !user, reason: user ? "Username already taken" : null };
}

// Exporting auth services
export {
    loginService,
    signupService,
    checkUsernameService,
};
