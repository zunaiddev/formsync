import {useNavigate} from "react-router-dom";
import {AlertTriangle} from "lucide-react";

function SomethingWentWrongPage({message = "Something went wrong. Please try again."}) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-6 text-center">
            <div
                className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full flex flex-col items-center gap-4 border border-gray-700">
                <AlertTriangle className="text-red-500" size={60}/>

                <h1 className="text-2xl font-semibold text-red-400">Oops!</h1>
                <p className="text-gray-300 text-sm leading-relaxed">{message}</p>

                <div className="flex gap-3 mt-4 w-full justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-sm text-sm"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-sm text-sm"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SomethingWentWrongPage;