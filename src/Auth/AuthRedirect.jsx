import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import isAuthenticated from "../util/jwtAuth.js"
import {useEffect, useState} from "react";

const AuthRedirect = ({children}) => {
    const [authStatus, setAuthStatus] = useState(null);

    useEffect(() => {
        (async () => {
            setAuthStatus(await isAuthenticated());
        })();
    }, []);

    if (authStatus === null) {
        return null;
    }

    return authStatus ? <Navigate to="/dashboard"/> : children;
};

AuthRedirect.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthRedirect;