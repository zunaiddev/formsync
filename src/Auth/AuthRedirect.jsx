import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getToken} from "../services/authService.js";
import Loader from "../components/Loader/Loader.jsx";

const AuthRedirect = ({children}) => {
    const [authStatus, setAuthStatus] = useState(null);

    useEffect(() => {
        (async () => {
            let token = await getToken();
            setAuthStatus(token !== null);
        })();
    }, []);

    if (authStatus === null) {
        return <Loader/>;
    }

    return authStatus ? <Navigate to="/dashboard"/> : children;
};

AuthRedirect.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthRedirect;