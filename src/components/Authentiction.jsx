import {useQuery} from "@tanstack/react-query";
import {verifyToken} from "../services/authService.js";
import SuccessPopup from "./Popup/SuccessPopup.jsx";
import AuthenticationLoader from "./Loader/AuthenticationLoader.jsx";
import ErrorPopup from "./Popup/ErrorPopup.jsx";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {HttpStatusCode} from "axios";
import SomethingWentWrongPage from "./SomethingWentWrong.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function Authentication({token}) {
    const navigate = useNavigate();

    const {data, isPending, error, refetch} = useQuery({
        queryKey: ["verify"],
        queryFn: () => verifyToken(token),
        retry: false,
        gcTime: undefined,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data) {
            localStorage.setItem("token", data?.extra?.token);
            let id = toast.loading("Redirecting...");

            setTimeout(() => {
                navigate("/dashboard", {replace: true});
                toast.remove(id);
            }, 3000);
        }
    }, [data]);

    if (isPending) {
        return <AuthenticationLoader/>;
    }


    if (error) {
        const response = error?.response;
        const {title, message} = response.data;
        const status = response.active;


        return (status === HttpStatusCode.BadRequest
            || status === HttpStatusCode.ImUsed) ?
            <ErrorPopup title={title} retry={refetch}
                        message={message}/> :
            <SomethingWentWrongPage/>
    }

    return <SuccessPopup title={data.title} message={data.message}/>;
}

Authentication.propTypes = {
    token: PropTypes.string.isRequired,
}

export default Authentication;