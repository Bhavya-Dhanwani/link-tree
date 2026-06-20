// Importing modules
import { createLinkService, getLinksService } from "../services/link.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// Creating a new link
const createLink = asyncWrapper(async (req, res) => {
    const link = await createLinkService(req.body, req.user.name);

    return ApiResponse(res, 201, "Link created successfully", link);
});

// Getting links by username (public)
const getLinks = asyncWrapper(async (req, res) => {
    const links = await getLinksService(req.params.username);

    return ApiResponse(res, 200, "Links fetched successfully", links);
});

// Exporting link controllers
export {
    createLink,
    getLinks,
};
