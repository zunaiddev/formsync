import API from "../api.js";

export async function login(email, password) {
    try {
        const response = await API.post("/auth/login", {email, password});
        localStorage.setItem("accessToken", response.data.token);
        return {success: true, data: response.data, error: null};
    } catch {
        return {
            success: false,
            data: null,
            error: "Invalid email or password",
        };
    }
}

export default login;