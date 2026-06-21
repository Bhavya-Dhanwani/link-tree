// Importing modules
import User from "../models/user.model.js";

// Finding user by email
async function findUserByEmail(email) {
    return User.findOne({ email: email.toLowerCase().trim() });
}

// Finding user by email with password
async function findUserByEmailWithPassword(email) {
    return User.findOne({ email: email.toLowerCase().trim() }).select("+password");
}

// Creating user
async function createUser(userData) {
    return User.create(userData);
}

// Finding user by ID
async function findUserById(id) {
    return User.findById(id);
}

// Finding user by name
async function findUserByName(name) {
    return User.findOne({ name: name.trim() });
}

// Exporting user DAO methods
export {
    createUser,
    findUserByEmail,
    findUserByEmailWithPassword,
    findUserById,
    findUserByName,
};
