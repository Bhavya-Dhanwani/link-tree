// Importing modules
import Link from "../models/links.model.js";

// Creating a new link
async function createLink(linkData) {
    return Link.create(linkData);
}

// Finding all active links by username (excluding soft-deleted)
async function findLinksByUsername(username) {
    return Link.find({ username, isDeleted: false });
}

// Finding all links by username (including soft-deleted)
async function findAllLinksByUsername(username) {
    return Link.find({ username });
}

// Finding only deleted links by username
async function findDeletedLinksByUsername(username) {
    return Link.find({ username, isDeleted: true });
}

// Finding a link by ID
async function findLinkById(id) {
    return Link.findById(id);
}

// Soft deleting a link by ID
async function softDeleteLinkById(id) {
    return Link.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
}

// Hard deleting a link by ID
async function hardDeleteLinkById(id) {
    return Link.findByIdAndDelete(id);
}

// Exporting link DAO methods
export {
    createLink,
    findLinksByUsername,
    findAllLinksByUsername,
    findDeletedLinksByUsername,
    findLinkById,
    softDeleteLinkById,
    hardDeleteLinkById,
};
