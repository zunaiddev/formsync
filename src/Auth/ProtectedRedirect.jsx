import PropTypes from "prop-types";
import {Navigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getToken} from "../services/tokenService.js";

const ProtectedRoute = ({children}) => {
    const [authStatus, setAuthStatus] = useState(true);
    const location = useLocation();
    const redirected = location.state?.redirected;

    if (redirected) {
        return children;
    }

    useEffect(() => {
        (async () => {
            setAuthStatus(await getToken() !== null);
        })();
    }, []);

    if (authStatus === null) {
        return null;
    }

    return authStatus ? children : <Navigate to="/auth/login" replace state={{redirected: true}}/>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;