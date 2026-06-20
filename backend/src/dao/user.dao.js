// Importing modules
import User from "../models/user.model.js";

// Finding user by email
async function findUserByEmail(email) {
    return User.findOne({ email: email.toLowerCase().trim() });
}

// Creating user
async function createUser(userData) {
    return User.create(userData);
}

// Exporting user DAO methods
export {
    createUser,
    findUserByEmail
};
