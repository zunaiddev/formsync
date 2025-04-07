import {jwtDecode} from "jwt-decode";

export function isValidToken(token) {
    try {
        jwtDecode(token);
        return true;
    } catch {
        return false;
    }
}

export function getPurpose(token) {
    try {
        return jwtDecode(token).purpose;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
}

export function isTokenExpired(token) {
    if (!token) return true;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
}