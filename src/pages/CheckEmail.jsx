import Button from "../components/Button/Button.jsx";
import {CheckCircle, Mail} from "lucide-react";
import {useNavigate, useSearchParams} from "react-router-dom";

function CheckEmail() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <div
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border w-full max-w-md p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-10 h-10 text-blue-600"/>
                        </div>
                        <div
                            className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                            <CheckCircle className="w-5 h-5 text-white"/>
                        </div>
                    </div>
                </div>

                <h1 className="mb-3">Verify Your Email</h1>

                <p className="text-gray-600 mb-6">
                    We've sent a verification email to <span className="text-gray-900">{params.get("email")}</span>.
                    Please check your inbox and click the verification link to activate your account.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        <strong>Didn't receive the email?</strong> Check your spam folder or request a new one.
                    </p>
                </div>

                <Button onClick={_ => navigate("/auth/login")}
                        className="w-full h-8 text-sm bg-transparent border text-gray-900 hover:bg-transparent">
                    Back to Login
                </Button>
            </div>
        </div>
    );
}

export default CheckEmail;