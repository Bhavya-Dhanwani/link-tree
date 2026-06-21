import apiClient from "@/lib/axios";

async function loginUser(payload) {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
}

async function signupUser(payload) {
    const response = await apiClient.post("/auth/signup", payload);
    return response.data;
}

async function getCurrentUser() {
    const response = await apiClient.get("/auth/me");
    return response.data;
}

async function logoutUser() {
    const response = await apiClient.post("/auth/logout");
    return response.data;
}

async function checkUsername(username) {
    const response = await apiClient.get(`/auth/check-username/${username}`);
    return response.data;
}

export {
    loginUser,
    signupUser,
    getCurrentUser,
    logoutUser,
    checkUsername,
};
