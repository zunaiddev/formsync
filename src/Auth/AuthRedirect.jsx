import PropTypes from "prop-types";
import {useQuery} from "@tanstack/react-query";
import {getToken} from "../services/jwtService.js";
import AuthenticationLoader from "../components/Loader/AuthenticationLoader.jsx";
import {Navigate} from "react-router-dom";
import toast from "react-hot-toast";
import SomethingWentWrong from "../components/SomethingWentWrong.jsx";

const AuthRedirect = ({children}) => {
    const {data: token, isPending, error, refetch} = useQuery({
        queryKey: ["get-token"],
        queryFn: getToken,
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


    return token ? <Navigate to="/dashboard" replace state={{redirected: true}}/> : children;
};

AuthRedirect.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthRedirect;