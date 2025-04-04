import API from "../api.js";
import toast from "react-hot-toast";

export async function fetchData(path) {
    let token = localStorage.getItem("accessToken");

    if (!token) {
        return {success: false, data: null, error: "Could not access access token"};
    }

    try {
        let response = await API.get(`/user/${path}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log(response.data.data);

        return {success: true, error: null, data: response.data.data};
    } catch {
        toast.error("Something went wrong");
        return {success: false, error: "Something went wrong"};
    }
}

export async function refreshToken() {
    try {
        let response = await API.post("/auth/refresh");
        console.log(response.data.data.token)
        return response.data.data.token;
    } catch (error) {
        console.error("Session expired. Redirecting to login.", error);
        return null;
    }
}

export async function deleteForm(id) {
    let token = localStorage.getItem("accessToken");

    if (!token) {
        return {success: false, data: null, error: "Could not access access token"};
    }

    try {
        let response = await API.delete(`/user/forms/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success("Form deleted Successfully");

        return {success: true, error: null, data: response.data};
    } catch (error) {
        if (error.response?.status === 401) {
            const newToken = await refreshToken();
            if (newToken) {
                return fetchData();
            }
        }

        toast.error(error.response?.data?.message || "Something went wrong");
        return {success: false, error: "Something went wrong"};
    }
}