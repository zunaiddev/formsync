import API from "../api.js";
import {getToken} from "./jwtService.js";

async function request(type, uri = "", body) {
    let token = await getToken();

    if (!token) {
        throw new Error("Token not found.");
    }

    const URL = `/users${uri}`;
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    let response;

    if (type === "GET") {
        response = await API.get(URL, {headers});
    } else if (type === "POST") {
        response = await API.post(URL, body, {headers});
    } else if (type === "PATCH") {
        response = await API.patch(URL, body, {headers});
    } else if (type === "PUT") {
        response = await API.put(URL, body, {headers});
    } else if (type === "DELETE") {
        response = await API.delete(URL, {headers, data: body});
    } else {
        throw new Error("Unknown type for " + type);
    }

    return response?.data;
}

async function getUser() {
    return await request("GET");
}

async function updateUser(data) {
    return await request("PATCH", "", data);
}

async function deleteUser(id) {
    return await request("DELETE", id);
}

async function getApiKey() {
    return await request("GET", "/api-key");
}

async function generateApiKey() {
    return await request("POST", "/api-key");
}

async function reGenerateApiKey() {
    return await request("PUT", "/api-key");
}

async function addDomain(data) {
    return await request("POST", "/api-key/domain", data);
}

async function deleteDomain(id) {
    return await request("DELETE", `/api-key/domain/${id}`);
}

async function getForms() {
    return await request("GET", "/forms");
}

async function deleteForms(ids) {
    return await request("DELETE", `/forms`, ids);
}

export {
    getUser, updateUser, deleteUser, getApiKey,
    generateApiKey, reGenerateApiKey, addDomain,
    deleteDomain, getForms, deleteForms
};