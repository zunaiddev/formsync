import API from "../api.js";
import {refreshToken} from "./userService.js";
import {isTokenExpired} from "../util/jwt.js";

export async function login(email, password) {
    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordReg = /^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,20}$/;
    if (!emailReg.test(email) || !passwordReg.test(password)) {
        return {
            success: false,
            status: 401,
            token: null
        };
    }


    try {
        const response = await API.post("/auth/login", {email, password});
        return {
            success: true,
            status: response.status,
            token: response.data.data.token,
        };
    } catch (error) {
        console.error("Error response sent");
        return {
            success: false,
            status: error.response ? error.response.status : 500,
            token: null
        };
    }
}

export async function signup(name, email, password) {
    try {
        let response = await API.post("/auth/signup", {name, email, password});
        return {success: true, data: response.data, statusCode: response.status};
    } catch (err) {
        return {success: false, data: null, statusCode: err.response.status};
    }
}

export async function verifyToken(token) {
    try {
        let response = await API.get(`/verify`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            success: true,
            message: response.data.message,
            data: response.data.data,
            statusCode: response.status,
        };
    } catch (err) {
        console.log("Error Response:", err.response);

        return {
            success: false,
            message: err.response.data,
            statusCode: err.response.status,
        };
    }
}

export async function getToken() {
    let token = localStorage.getItem("accessToken");

    if (!token && isTokenExpired(token)) {
        return null;
    }

    if (token) {
        if (!isTokenExpired(token)) {
            return token;
        }
    }

    token = await refreshToken();

    if (!token) {
        return null;
    }

    localStorage.setItem("accessToken", token);

    return token;
}

export async function forgotPassword(email) {
    try {
        await API.post("/auth/forget-password", {email: email});
        return true;
    } catch {
        return false;
    }
}

export default login;