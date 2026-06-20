// Importing modules
import { recordClick, getClickAnalyticsByUsername } from "../dao/clickCount.dao.js";
import { findLinkById } from "../dao/link.dao.js";
import ApiError from "../utils/ApiError.js";

// Recording a click for a link
async function recordClickService(linkId) {
    const link = await findLinkById(linkId);

    if (!link || link.isDeleted) {
        throw new ApiError(404, "Link not found");
    }

    const click = await recordClick(linkId, link.username);
    return click;
}

// Getting click analytics for a user
async function getClickAnalyticsByUserService(username) {
    const analytics = await getClickAnalyticsByUsername(username);
    return analytics;
}

// Exporting click count services
export {
    recordClickService,
    getClickAnalyticsByUserService,
};
