// Importing modules
import { recordClickService, getClickAnalyticsByUserService } from "../services/clickCount.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// Recording a click
const recordClick = asyncWrapper(async (req, res) => {
    const click = await recordClickService(req.params.linkId);

    return ApiResponse(res, 201, "Click recorded successfully", click);
});

// Getting click analytics for a user
const getClickAnalyticsByUser = asyncWrapper(async (req, res) => {
    const analytics = await getClickAnalyticsByUserService(req.params.username);

    return ApiResponse(res, 200, "Analytics fetched successfully", analytics);
});

// Exporting click count controllers
export {
    recordClick,
    getClickAnalyticsByUser,
};
