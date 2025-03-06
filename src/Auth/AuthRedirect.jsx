import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

const AuthRedirect = ({children}) => {
    const isAuth = !!localStorage.getItem("accessToken");

    return isAuth ? <Navigate to="/dashboard"/> : children;
};

AuthRedirect.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthRedirect;