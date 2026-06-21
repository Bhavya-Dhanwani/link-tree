// Importing modules
import Link from "../models/links.model.js";

// Creating a new link
async function createLink(linkData) {
    return Link.create(linkData);
}

// Finding all active links by username (excluding soft-deleted)
async function findLinksByUsername(username) {
    return Link.find({ username, isDeleted: false }).sort({ order: 1 });
}

// Finding all links by username (including soft-deleted)
async function findAllLinksByUsername(username) {
    return Link.find({ username }).sort({ order: 1 });
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

// Restoring a soft-deleted link by ID
async function restoreLinkById(id) {
    return Link.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
}

// Reordering multiple links
async function reorderLinks(updates) {
    const bulkOps = updates.map(({ id, order }) => ({
        updateOne: {
            filter: { _id: id },
            update: { order },
        },
    }));

    return Link.bulkWrite(bulkOps);
}

// Getting max order for a user
async function getMaxOrder(username) {
    const result = await Link.findOne({ username }).sort({ order: -1 }).select("order");
    return result ? result.order : -1;
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
    restoreLinkById,
    reorderLinks,
    getMaxOrder,
};
