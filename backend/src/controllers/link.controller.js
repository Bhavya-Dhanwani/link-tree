// Importing modules
import { createLinkService, getLinksService, getAllLinksService, getDeletedLinksService, deleteLinkService, hardDeleteLinkService, restoreLinkService, reorderLinkService } from "../services/link.service.js";
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

// Getting all links including soft-deleted (protected)
const getAllLinks = asyncWrapper(async (req, res) => {
    const links = await getAllLinksService(req.user.name);

    return ApiResponse(res, 200, "Links fetched successfully", links);
});

// Getting only deleted links (protected)
const getDeletedLinks = asyncWrapper(async (req, res) => {
    const links = await getDeletedLinksService(req.user.name);

    return ApiResponse(res, 200, "Deleted links fetched successfully", links);
});

// Getting active links for the logged-in user (protected)
const getMyLinks = asyncWrapper(async (req, res) => {
    const links = await getLinksService(req.user.name);

    return ApiResponse(res, 200, "Links fetched successfully", links);
});

// Restoring a soft-deleted link
const restoreLink = asyncWrapper(async (req, res) => {
    const link = await restoreLinkService(req.params.id, req.user.name);

    return ApiResponse(res, 200, "Link restored successfully", link);
});

// Reordering links
const reorderLinks = asyncWrapper(async (req, res) => {
    const links = await reorderLinkService(req.user.name, req.body.orderedIds);

    return ApiResponse(res, 200, "Links reordered successfully", links);
});

// Exporting link controllers
export {
    createLink,
    getLinks,
    getMyLinks,
    getAllLinks,
    getDeletedLinks,
    deleteLink,
    hardDeleteLink,
    restoreLink,
    reorderLinks,
};
