import {Navigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getToken} from "../services/tokenService.js";

const AuthRedirect = ({children}) => {
    const [authStatus, setAuthStatus] = useState(null);
    const location = useLocation();
    const redirected = location.state?.redirected;

    if (redirected) {
        return children;
    }

    useEffect(() => {
        (async () => {
            let token = await getToken();
            setAuthStatus(token !== null);
        })();
    }, []);

    if (authStatus === null) {
        return null;
    }

    return authStatus ? <Navigate to="/dashboard" replace state={{redirected: true}}/> : children;
};

AuthRedirect.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthRedirect;