import {refreshToken} from "./authService.js";

async function getToken() {
    let token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    if (isExpired(token)) {
        token = await refreshToken();

        if (!token) {
            return null;
        }
    }

    localStorage.setItem("token", token);

    return token;
}

function extractClaims(token) {
    try {
        let payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (err) {
        return null;
    }
}

export {getToken, extractClaims};