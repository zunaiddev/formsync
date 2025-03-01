import API from "../api.js";
import toast from "react-hot-toast";

export async function userInfo(path) {
    let token = localStorage.getItem("accessToken");

    if (!token) {
        return {success: false, error: "Could not access access token"};
    }

    try {
        let response = await API.get(`/user/${path}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {success: true, error: null, data: response.data};
    } catch (error) {
        if (error.response?.status === 401) {
            const newToken = await refreshToken();
            if (newToken) {
                return userInfo();
            }
        }

        toast.error(error.response?.data?.message || "Something went wrong");
        return {success: false, error: "Something went wrong"};
    }
}

async function refreshToken() {
    try {
        let response = await API.post("/auth/refresh-token");
        localStorage.setItem("accessToken", response.data.token);
        return response.data.token;
    } catch (error) {
        console.error("Session expired. Redirecting to login.", error);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return null;
    }
}
