import {useEffect} from "react";
import Nprogress from "nprogress";

function TopLoader() {
    useEffect(() => {
        Nprogress.start();
        return () => {
            Nprogress.done();
        }
    })
    return null;
}

export default TopLoader;