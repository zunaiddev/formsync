import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {verifyToken} from "../services/authService.js";
import toast from "react-hot-toast";

function Verify() {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [isSuccess, setSuccess] = useState(true);

    useEffect(() => {
        (async () => {
            let response = await verifyToken(token);
            setSuccess(response.success)
            if (response.success) {
                toast.success("Email verification successfully.");
                navigate("/auth/login");
                return;
            }

            toast.error(response.message || "Something went wrong");
        })();
    }, []);

    return (
        <div className="w-full h-[100vh] flex justify-center flex-col gap-3 items-center text-white">
            {
                isSuccess ? <h1>Verifying........</h1> : <h1>Something Went Wrong</h1>
            }
        </div>
    );
}

export default Verify;