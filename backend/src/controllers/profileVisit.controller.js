import { recordProfileVisitService, getProfileVisitAnalyticsService, getProfileVisitTimelineService } from "../services/profileVisit.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const recordVisit = asyncWrapper(async (req, res) => {
    const { username } = req.params;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

    await recordProfileVisitService(username, ip);

    return ApiResponse(res, 201, "Visit recorded");
});

const getProfileVisitAnalytics = asyncWrapper(async (req, res) => {
    const analytics = await getProfileVisitAnalyticsService(req.params.username);

    return ApiResponse(res, 200, "Analytics fetched", analytics);
});

const getProfileVisitTimeline = asyncWrapper(async (req, res) => {
    const { time } = req.query;
    const data = await getProfileVisitTimelineService(req.params.username, time);

    return ApiResponse(res, 200, "Timeline fetched", data);
});

export {
    recordVisit,
    getProfileVisitAnalytics,
    getProfileVisitTimeline,
};
