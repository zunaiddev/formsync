import API from "../api.js";
import Unauthorized from "../Error.js";

async function signup(data) {
    const response = await API.post("/auth/signup", data);

    return response.data;
}

async function login(data) {
    const email = data.email.toLowerCase();
    const password = data.password.trim();

    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordReg = /^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,20}$/;

    if (!emailReg.test(email) || !passwordReg.test(password)) {
        throw new Unauthorized("Invalid Email or password");
    }

    return (await API.post("/auth/login", {email, password}, {
        withCredentials: true
    })).data;
}

async function refreshToken() {
    let response = await API.get("/auth/refresh", {withCredentials: true});
    return response.data;
}

async function forgetPassword(email) {
    let response = await API.post("/auth/forget-password", {email});
    return response.data;
}

async function logout() {
    let response = await API.get("/auth/logout", {
        withCredentials: true
    });
    return response.data;
}

async function verifyToken(token, withCredentials) {
    let response = await API.patch(`/verify`, undefined, {
        headers: {
            Authorization: "Bearer " + token,
        },
        withCredentials: withCredentials
    });

    return response.data;
}

async function resetPassword(token, data) {
    let response = await API.patch(`/verify`, data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    return response.data;
}

export {
    login, signup, refreshToken, forgetPassword, logout, verifyToken,
    resetPassword
};