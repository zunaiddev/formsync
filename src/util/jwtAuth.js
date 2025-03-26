function isAuthenticated() {
    return localStorage.getItem("accessToken");
}

export default isAuthenticated;
