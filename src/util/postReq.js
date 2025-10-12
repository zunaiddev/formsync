import API from "../api.js";
import ErrorType from "./ErrorType.js";

async function postReq(uri, data) {
    try {
        let response = await API.post(uri, data);
        return {data: response?.data, error: null};
    } catch (err) {
        if (err.response) {
            return {error: {type: ErrorType.server, status: err.status}};
        }

        if (err.request) {
            return {error: {type: ErrorType.network}};
        }

        return {error: {type: ErrorType.client}};
    }
}

export default postReq;