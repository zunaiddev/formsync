import PropTypes from "prop-types";
import AuthenticationLoader from "../components/Loader/AuthenticationLoader.jsx";
import SomethingWentWrong from "../components/SomethingWentWrong.jsx";
import {Navigate} from "react-router-dom";
import {getToken} from "../services/jwtService.js";
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";

const ProtectedRoute = ({children}) => {
    const {data: token, isPending, error, refetch} = useQuery({
        queryKey: ["get_token"],
        queryFn: getToken,
        select: data => data.token,
        retry: false
    });

    if (isPending) {
        return <div className="w-full h-screen flex justify-center items-center">
            <AuthenticationLoader/>
        </div>;
    }

    if (error) {
        if (error.response) {
            localStorage.clear();
            toast.success("Logged out");
            return children;
        }

        return <SomethingWentWrong retry={refetch}/>
    }


    return token ? children : <Navigate to="/auth/login" replace state={{redirected: true}}/>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;