import API from "../api.js";
import toast from "react-hot-toast";

export async function login(email, password) {
    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordReg = /^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,20}$/;
    if (!emailReg.test(email) || !passwordReg.test(password)) {
        return {
            success: false,
            status: 401,
            token: null
        };
    }


    try {
        const response = await API.post("/auth/login", {email, password});
        return {
            success: true,
            status: response.status,
            token: response.data.data.token,
        };
    } catch (error) {
        console.error("Error response sent");
        return {
            success: false,
            status: error.response ? error.response.status : 500,
            token: null
        };
    }
}

export async function signup(name, email, password) {
    try {
        let response = await API.post("/auth/signup", {name, email, password});
        return {success: true, data: response.data, error: null};
    } catch (err) {
        console.log(err);
        if (!err?.response && err.response?.status === 500) {
            toast.error("Server Not responding");
        } else if (err.response?.status === 409) {
            toast.error("Email already exists.");
        } else {
            toast.error("Something went wrong. Please try again");
        }

        return {
            success: false,
            data: null,
            statusCode: err.response?.statusCode || 500,
        };
    }
}

export async function verifyToken(token) {
    if (!token) {
        return {
            success: false,
            message: "Token is missing or invalid.",
            statusCode: 400,
        };
    }

    try {
        // Make the API call
        let response = await API.post(`/verify?token=${token}`);
        console.log("Response:", response);

        return {
            success: true,
            data: response.data, // Successful response
            statusCode: response.status,
        };
    } catch (err) {
        // Log the full error response for debugging
        console.log("Error Response:", err.response);

        return {
            success: false,
            message: err.response?.data?.error || err.message || "An error occurred.",
            statusCode: err.response?.status || 500,
        };
    }
}


export default login;