import API from "../api.js";
import ErrorType from "../util/ErrorType.js";
import {HttpStatusCode} from "axios";
import postReq from "../util/postReq.js";

async function login(data) {
    const email = data.email;
    const password = data.password;

    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordReg = /^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,20}$/;

    if (!emailReg.test(email) || !passwordReg.test(password)) {
        return {type: ErrorType.server, status: HttpStatusCode.Unauthorized};
    }

    return await postReq("/auth/login", {email, password});
}

async function signup(data) {
    return await postReq("/auth/signup", data);
}

async function refreshToken() {
    let response = await API.post("/auth/refresh");
    return response?.data;
}

async function forgetPassword(email) {
    let response = await API.post("/auth/forget-password", {email});
    return response?.data;
}

async function logout() {
    let response = await API.post("/auth/logout");
    return response?.data;
}

async function verifyToken(token) {
    let response = await API.get(`/verify`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response?.data;
}

export {login, signup, refreshToken, forgetPassword, logout, verifyToken};