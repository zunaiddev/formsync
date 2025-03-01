import API from "../api.js";

export async function login(email, password) {
    // if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/)) {
    //     console.error("without api call");
    //     return {
    //         success: false,
    //         data: null,
    //         error: "Invalid email or password",
    //     };
    // }

    try {
        const response = await API.post("/auth/login", {email, password});
        localStorage.setItem("accessToken", response.data.token);
        console.log(response.data);
        return {success: true, data: response.data, error: null};
    } catch (error) {
        console.log(error);
        return {
            success: false,
            data: null,
            error: error.message || "An error occurred"
        };
    }
}

export default login;