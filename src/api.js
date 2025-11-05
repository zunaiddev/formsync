import axios, {HttpStatusCode} from "axios";
import toast from "react-hot-toast";

const API = axios.create({
    baseURL: `${location.hostname === "localhost" ?
        import.meta.env.VITE_API_LOCAL_URL : import.meta.env.VITE_API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(config => {
    if (!navigator.onLine) {
        return Promise.reject(new Error("Network Error"));
    }

    return config;
});

API.interceptors.response.use(res => res, error => {
    if (error.code === "ECONNABORTED") {
        toast.error("Request timed out");
    } else if (!error.request) {
        toast.error("No Internet Connection");
    } else if (!error.response) {
        toast.error("Server Not Responding.");
    } else if (error.response.status === HttpStatusCode.InternalServerError) {
        toast.error("Internal Server Error");
    }

    return Promise.reject(error);
});

export default API;