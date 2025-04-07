import API from "../api.js";
import toast from "react-hot-toast";

export async function fetchData(path, token) {
    try {
        let response = await API.get(`/user/${path}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {success: true, error: null, data: response.data.data};
    } catch (error) {
        console.log(error);
        return {success: false, error: "Something went wrong"};
    }
}

export async function refreshToken() {
    try {
        let response = await API.post("/auth/refresh");
        return response.data.data.token;
    } catch (error) {
        console.error("An Error Occurred:", error);
        return null;
    }
}

export async function deleteForm(id, token) {
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

export async function logout() {

    try {
        await API.get("/auth/logout");
        window.location.reload();
    } catch (error) {
        console.log(error);
    }

    localStorage.removeItem("accessToken");
}

export async function regenerateKey(token) {
    try {
        let response = await API.put(`/user/key`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {data: response.data.data};
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        return null;
    }
}

export async function generateKey(domain, token) {
    try {
        let response = await API.post(`/user/key`, {domain: domain}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {data: response.data.data};
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        return null;
    }
}