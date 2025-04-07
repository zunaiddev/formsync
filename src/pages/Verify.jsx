import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {verifyToken} from "../services/authService.js";
import toast from "react-hot-toast";
import {getPurpose, isTokenExpired, isValidToken} from "../util/jwt.js";
import Loader from "../components/Loader/Loader.jsx";

function Verify() {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {

        if (!token) {
            navigate("/auth/login");
            return;
        }

        if (!isValidToken(token)) {
            navigate("/auth/login");
            return;
        }

        if (isTokenExpired(token)) {
            navigate("/auth/login");
            return;
        }

        (async () => {
            console.log(token);
            let response = await verifyToken(token);

            if (response.success) {
                console.log(getPurpose(token));
                if (getPurpose(token) === "verify_user") {
                    localStorage.setItem("accessToken", response.data.token);
                }
                toast.success("Email verification success.");
                navigate("/auth/login");
            }

            navigate("/auth/login");
        })();
    }, []);

    return <Loader/>;
}

export default Verify;