import {useEffect} from "react";
import {confirmReactivate} from "../util/popup.jsx";

function Test() {
    useEffect(() => {
        (async () => {
            let response = await confirmReactivate();
            console.log(response);
        })();
    }, [])

    return null;
}

export default Test;