// Importing modules
import Link from "../models/links.model.js";

// Creating a new link
async function createLink(linkData) {
    return Link.create(linkData);
}

// Finding all links by username (excluding soft-deleted)
async function findLinksByUsername(username) {
    return Link.find({ username, isDeleted: false });
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
    findLinkById,
    softDeleteLinkById,
    hardDeleteLinkById,
};
