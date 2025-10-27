import {useNavigate, useSearchParams} from "react-router-dom";
import AuthenticationLoader from "../components/Loader/AuthenticationLoader.jsx";

function Verify() {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-950">
            <div className="w-full max-w-md p-2">
                <AuthenticationLoader/>
            </div>
        </div>
    );
}

export default Verify;