// Importing modules
import { createUser, findUserByEmail, findUserByEmailWithPassword, findUserByName, findUserById, updateUserProfilePicture, updateUserUsername, updateUserTheme } from "../dao/user.dao.js";
import ApiError from "../utils/ApiError.js";
import ImageKit from "@imagekit/nodejs";
import { IMAGEKIT_PRIVATE_KEY } from "../config/env.config.js";

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

// Getting ImageKit authentication parameters for client upload
function getImageKitAuth() {
    const imagekit = new ImageKit({
        privateKey: IMAGEKIT_PRIVATE_KEY,
    });

    const result = imagekit.helper.getAuthenticationParameters();
    return result;
}

// Deleting a file from ImageKit by URL
async function deleteImageKitFile(fileUrl) {
    if (!fileUrl) return;

    const imagekit = new ImageKit({
        privateKey: IMAGEKIT_PRIVATE_KEY,
    });

    try {
        const urlPath = new URL(fileUrl).pathname;
        await imagekit.files.delete(urlPath);
    } catch {
        // ignore deletion errors
    }
}

// Updating user profile picture
async function updateProfilePictureService(userId, imageUrl) {
    if (!imageUrl) {
        throw new ApiError(400, "Image URL is required");
    }

    const currentUser = await findUserById(userId);

    if (!currentUser) {
        throw new ApiError(404, "User not found");
    }

    if (currentUser.profilePicture) {
        await deleteImageKitFile(currentUser.profilePicture);
    }

    const user = await updateUserProfilePicture(userId, imageUrl);

    return user;
}

// Getting current user from DB
async function getCurrentUserService(userId) {
    const user = await findUserById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
}

// Updating user username
async function updateUsernameService(userId, newName) {
    if (!newName || !newName.trim()) {
        throw new ApiError(400, "Username is required");
    }

    const username = newName.trim();

    if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
        throw new ApiError(400, "Username must be 3-20 characters, alphanumeric only");
    }

    if (RESERVED_USERNAMES.includes(username.toLowerCase())) {
        throw new ApiError(400, "This username is reserved");
    }

    const currentUser = await findUserById(userId);

    if (!currentUser) {
        throw new ApiError(404, "User not found");
    }

    if (currentUser.name === username) {
        throw new ApiError(400, "New username must be different from current username");
    }

    const existingUser = await findUserByName(username);

    if (existingUser) {
        throw new ApiError(409, "Username already taken");
    }

    const user = await updateUserUsername(userId, username);

    const token = user.generateToken();

    return { user, token };
}

// Updating user theme
async function updateThemeService(userId, bgColor, textColor) {
    if (!bgColor || !textColor) {
        throw new ApiError(400, "Both bgColor and textColor are required");
    }

    const user = await updateUserTheme(userId, bgColor, textColor);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
}

// Getting public user theme by username
async function getPublicUserThemeService(username) {
    const user = await findUserByName(username);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return {
        username: user.name,
        profilePicture: user.profilePicture || "",
        bgColor: user.bgColor || "#ffffff",
        textColor: user.textColor || "#333333",
    };
}

// Exporting auth services
export {
    loginService,
    signupService,
    checkUsernameService,
    getImageKitAuth,
    updateProfilePictureService,
    updateUsernameService,
    getCurrentUserService,
    updateThemeService,
    getPublicUserThemeService,
};
