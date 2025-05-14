import PropTypes from "prop-types";
import {Navigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getToken} from "../services/tokenService.js";
import Loader from "../components/Loader/Loader.jsx";

const ProtectedRoute = ({children}) => {
    const [authStatus, setAuthStatus] = useState(true);
    const location = useLocation();
    const redirected = location.state?.redirected;

    useEffect(() => {
        (async () => {
            setAuthStatus(await getToken() !== null);
        })();
    }, []);

    if (authStatus === null) {
        return <Loader/>;
    }

    if (redirected) {
        return children;
    }

    return authStatus ? children : <Navigate to="/auth/login" replace state={{redirected: true}}/>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;