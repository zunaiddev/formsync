import {useEffect} from "react";
import {getToken} from "../services/jwtService.js";

function Test() {
    useEffect(() => {
        (async () => {
            const data = getToken();
            console.log("token", data);
        })();
    }, [])

    return null;
}

export default Test;