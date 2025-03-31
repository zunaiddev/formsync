import {refreshToken} from "../services/userService.js";
import {jwtDecode} from "jwt-decode";

async function isAuthenticated() {
    let token = localStorage.getItem("accessToken");

    if (token) {
        if (!isTokenExpired(token)) {
            return true;
        }
    }

    let newToken = await refreshToken();
    console.log(newToken);
    if (!newToken) {
        console.log("Refresh token expired");
        return false;
    }

    localStorage.setItem("accessToken", newToken);

    return true;
}

const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};

export default isAuthenticated;