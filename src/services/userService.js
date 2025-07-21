import API from "../api.js";
import toast from "react-hot-toast";
import {getToken} from "./tokenService.js";

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

export async function deleteForm(ids, token) {
    try {
        await API.delete(`/user/forms`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                id: ids,
            }
        });

        return {success: true};
    } catch {
        return {success: false};
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
                Authorization: `Bearer ${token}`,
            },
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
        let response = await API.post(
            `/user/key`,
            domain,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return {data: response.data.data};
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        return null;
    }
}

export async function addDomain(domain) {
    try {
        let response = await API.put(
            "user/key/domain",
            domain,
            {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            },
        );

        return {success: true, data: response.data.data};
    } catch (error) {
        console.log(error);
        return {success: false, status: error?.response.status || 500};
    }
}

export async function removeDomain(domain, token) {
    return true;
}

export async function deleteUser(token, data) {
    try {
        return (await API.delete(`/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data
        })).status;
    } catch (err) {
        return err.status;
    }
}