import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import isAuthenticated from "../util/jwtAuth.js";

const ProtectedRoute = ({children}) => {
    const [authStatus, setAuthStatus] = useState(true);

    useEffect(() => {
        (async () => {
            setAuthStatus(await isAuthenticated());
        })();
    }, []);

    if (authStatus === null) {
        return null;
    }

    return authStatus ? children : <Navigate to="/auth/login"/>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;