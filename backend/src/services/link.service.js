// Importing modules
import { createLink, findLinksByUsername } from "../dao/link.dao.js";
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

// Exporting link services
export {
    createLinkService,
    getLinksService,
};
