import {useNavigate} from "react-router-dom";

function Verify() {
    let navigate = useNavigate();

    return (
        <div className="w-full h-[100vh] flex justify-center flex-col gap-3 items-center text-white">
            <h1 className="font-bold text-xl">Please check your email to verify your account.</h1>
            <button className="cursor-pointer px-6 py-1 bg-blue-500 rounded-md"
                    onClick={() => {
                        navigate("/auth/login")
                    }}>login
            </button>
        </div>
    );
}

export default Verify;