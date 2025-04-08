import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getToken} from "../services/authService.js";
import Loader from "../components/Loader/Loader.jsx";

const ProtectedRoute = ({children}) => {
    const [authStatus, setAuthStatus] = useState(true);

    useEffect(() => {
        (async () => {
            setAuthStatus(await getToken() !== null);
        })();
    }, []);

    if (authStatus === null) {
        return <Loader/>;
    }

    return authStatus ? children : <Navigate to="/auth/login" replace/>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;