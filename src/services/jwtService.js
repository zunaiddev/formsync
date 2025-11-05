import {refreshToken} from "./authService.js";

async function getToken() {
    let token = localStorage.getItem("token");
    if (!token) return {token: null};

    const claims = extractClaims(token);

    if (claims?.exp * 1000 <= Date.now()) {
        let data = await refreshToken();
        token = data.token;
        localStorage.setItem("token", token);
    }

    return {token};
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