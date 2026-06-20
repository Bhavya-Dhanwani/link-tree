// Importing modules
import Link from "../models/links.model.js";

// Creating a new link
async function createLink(linkData) {
    return Link.create(linkData);
}

// Exporting link DAO methods
export {
    createLink,
};
