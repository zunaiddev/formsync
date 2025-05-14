import {isTokenExpired} from "../util/jwt.js";
import {refreshToken} from "./userService.js";

export async function getToken() {
    let token = localStorage.getItem("accessToken");

    if (!token) {
        return null;
    }

    if (isTokenExpired(token)) {
        token = await refreshToken();

        if (!token) {
            return null;
        }
    }

    localStorage.setItem("accessToken", token);

    return token;
}