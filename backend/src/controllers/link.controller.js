// Importing modules
import { createLinkService } from "../services/link.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// Creating a new link
const createLink = asyncWrapper(async (req, res) => {
    const link = await createLinkService(req.body, req.user.name);

    return ApiResponse(res, 201, "Link created successfully", link);
});

// Exporting link controllers
export {
    createLink,
};
