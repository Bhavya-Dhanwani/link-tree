// Importing modules
import { createLink } from "../dao/link.dao.js";

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

// Exporting link services
export {
    createLinkService,
};
