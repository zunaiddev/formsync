async function getToken() {
    return localStorage.getItem("token");
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