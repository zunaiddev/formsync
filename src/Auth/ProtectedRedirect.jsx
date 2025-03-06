import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({children}) => {
    const isAuth = !!localStorage.getItem("accessToken");

    if (!isAuth) return <Navigate to="/auth/login"/>;

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute;