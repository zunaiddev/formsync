import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";
import isAuthenticated from "../util/jwtAuth.js";

const ProtectedRoute = ({children}) => {
    return isAuthenticated() ? children : <Navigate to="/auth/login"/>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;