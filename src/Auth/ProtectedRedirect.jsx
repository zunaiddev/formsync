import PropTypes from "prop-types";

const ProtectedRoute = ({children}) => {


    return children;
    // return authStatus ? children : <Navigate to="/auth/login" replace state={{redirected: true}}/>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;