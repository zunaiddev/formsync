import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Loader = () => {
    const location = useLocation();

    useEffect(() => {
        // Start loader when location changes
        NProgress.start();

        // Stop loader when navigation is complete
        return () => {
            NProgress.done();
        };
    }, [location]);

    return null; // No UI to render for the loader
};

export default Loader;
