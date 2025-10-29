import PropTypes from "prop-types";

const AuthRedirect = ({children}) => {
    return children;
    // return authStatus ? <Navigate to="/dashboard" replace state={{redirected: true}}/> : children;
};

AuthRedirect.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthRedirect;