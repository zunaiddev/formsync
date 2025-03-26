import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import isAuthenticated from "../util/jwtAuth.js"

const AuthRedirect = ({children}) => {
    return isAuthenticated() ? children : <Navigate to="/auth/login"/>;
};

AuthRedirect.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthRedirect;