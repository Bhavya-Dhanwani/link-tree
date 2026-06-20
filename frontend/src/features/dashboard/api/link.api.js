import apiClient from "@/lib/axios";

async function createLink(payload) {
    const response = await apiClient.post("/links", payload);
    return response.data;
}

async function getLinksByUsername(username) {
    const response = await apiClient.get(`/links/${username}`);
    return response.data;
}

async function deleteLink(linkId) {
    const response = await apiClient.delete(`/links/${linkId}`);
    return response.data;
}

async function recordClick(linkId) {
    const response = await apiClient.post(`/clicks/${linkId}`);
    return response.data;
}

export {
    createLink,
    getLinksByUsername,
    deleteLink,
    recordClick,
};
