// Importing modules
import { recordClick, getClickAnalyticsByUsername, getClicksPerLinkByUsername, getClicksPerLinkByUsernameSince } from "../dao/clickCount.dao.js";
import { findLinkById, findLinksByUsername } from "../dao/link.dao.js";
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

// Getting per-link click counts for a user
async function getClicksPerLinkService(username, timeFilter) {
    const now = new Date();
    let since;

    if (timeFilter === "last1h") {
        since = new Date(now - 60 * 60 * 1000);
    } else if (timeFilter === "last24h") {
        since = new Date(now - 24 * 60 * 60 * 1000);
    } else if (timeFilter === "last7d") {
        since = new Date(now - 7 * 24 * 60 * 60 * 1000);
    } else if (timeFilter === "last30d") {
        since = new Date(now - 30 * 24 * 60 * 60 * 1000);
    }

    const raw = since
        ? await getClicksPerLinkByUsernameSince(username, since)
        : await getClicksPerLinkByUsername(username);

    const links = await findLinksByUsername(username);
    const activeLinkIds = new Set(links.map((link) => link._id.toString()));
    const linkMap = {};
    links.forEach((link) => {
        linkMap[link._id.toString()] = link.title;
    });

    const result = raw
        .filter((item) => activeLinkIds.has(item._id.toString()))
        .map((item) => ({
            linkId: item._id,
            title: linkMap[item._id.toString()],
            count: item.count,
        }));

    return result;
}

// Exporting click count services
export {
    recordClickService,
    getClickAnalyticsByUserService,
    getClicksPerLinkService,
};
