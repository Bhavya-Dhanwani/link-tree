// Importing modules
import { createLink, findLinksByUsername, findLinkById, softDeleteLinkById, hardDeleteLinkById } from "../dao/link.dao.js";
import ApiError from "../utils/ApiError.js";

// Creating a new link
async function createLinkService(payload = {}, username) {
    const { title, url } = payload;

    const link = await createLink({
        title,
        url,
        username,
    });

    return link;
}

// Getting all links for a user
async function getLinksService(username) {
    const links = await findLinksByUsername(username);

    if (!links || links.length === 0) {
        throw new ApiError(404, "No links found for this user");
    }

    return links;
}

// Soft deleting a link
async function deleteLinkService(linkId, username) {
    const link = await findLinkById(linkId);

    if (!link) {
        throw new ApiError(404, "Link not found");
    }

    if (link.username !== username) {
        throw new ApiError(403, "You are not authorized to delete this link");
    }

    const deletedLink = await softDeleteLinkById(linkId);
    return deletedLink;
}

// Hard deleting a link permanently
async function hardDeleteLinkService(linkId, username) {
    const link = await findLinkById(linkId);

    if (!link) {
        throw new ApiError(404, "Link not found");
    }

    if (link.username !== username) {
        throw new ApiError(403, "You are not authorized to delete this link");
    }

    const deletedLink = await hardDeleteLinkById(linkId);
    return deletedLink;
}

// Exporting link services
export {
    createLinkService,
    getLinksService,
    deleteLinkService,
    hardDeleteLinkService,
};
