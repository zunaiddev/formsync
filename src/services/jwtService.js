import {refreshToken} from "./authService.js";

async function getToken() {
    let token = localStorage.getItem("token");
    if (!token) return {};

    const claims = extractClaims(token);

    if (claims?.exp * 1000 <= Date.now()) {
        let response = await refreshToken();
        console.log("Fetched From the Server.")
        token = response.data.token;
        localStorage.setItem("token", token);
    } else {
        console.log("Not Fetched From the Server.");
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