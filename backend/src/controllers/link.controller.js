// Importing modules
import { createLinkService, getLinksService, deleteLinkService, hardDeleteLinkService } from "../services/link.service.js";
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

// Soft deleting a link
const deleteLink = asyncWrapper(async (req, res) => {
    const link = await deleteLinkService(req.params.id, req.user.name);

    return ApiResponse(res, 200, "Link deleted successfully", link);
});

// Hard deleting a link permanently
const hardDeleteLink = asyncWrapper(async (req, res) => {
    const link = await hardDeleteLinkService(req.params.id, req.user.name);

    return ApiResponse(res, 200, "Link permanently deleted", link);
});

// Exporting link controllers
export {
    createLink,
    getLinks,
    deleteLink,
    hardDeleteLink,
};
