// Importing modules
import Link from "../models/links.model.js";

// Creating a new link
async function createLink(linkData) {
    return Link.create(linkData);
}

// Finding all links by username
async function findLinksByUsername(username) {
    return Link.find({ username });
}

// Exporting link DAO methods
export {
    createLink,
    findLinksByUsername,
};
