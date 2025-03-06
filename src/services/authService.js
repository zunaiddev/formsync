import API from "../api.js";
import toast from "react-hot-toast";

export async function isAvailable(email) {
    try {
        await API.get(`/auth/available/${email}`);
        return true;
    } catch {
        return false;
    }
}

export async function login(email, password) {
    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordReg = /^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,20}$/;
    if (!emailReg.test(email) || !passwordReg.test(password)) {
        toast.error("Invalid email or password");
        return {
            success: false,
            data: null,
            error: "Authentication failed",
        };
    }

    try {
        const response = await API.post("/auth/login", {email, password});
        localStorage.setItem("accessToken", response.data.token);
        return {success: true, data: response.data, error: null};
    } catch (err) {
        console.log(err);
        if (!err?.response) {
            toast.error("Server Not responding");
        } else if (err.response?.status === 401) {
            toast.error(err.response.data.message || "Authentication Failed");
        } else {
            toast.error(err.response.data.message || "Something went wrong");
        }

        return {
            success: false,
            data: null,
            error: err.response?.data.message || "Something went wrong",
        };
    }
}

export async function signup(name, email, password) {
    try {
        let response = await API.post("/auth/signup", {name, email, password});
        return {success: true, data: response.data, error: null};
    } catch (err) {
        console.log(err);
        if (!err?.response) {
            toast.error("Server Not responding");
        } else if (err.response?.status === 401) {
            toast.error(err.response.data.message || "Authentication Failed");
        } else {
            toast.error(err.response.data.message || "Something went wrong. try again");
        }

        return {
            success: false,
            data: null,
            error: err.response?.data.message || "Something went wrong",
        };
    }
}

export default login;