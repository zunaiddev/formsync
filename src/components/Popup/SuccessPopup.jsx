import {CheckCircle2} from "lucide-react";
import PropTypes from "prop-types";

function SuccessPopup({title, message}) {
    return (
        <div className="w-full max-w-md bg-gray-900 rounded-lg border border-green-900/50 p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                    <CheckCircle2 className="w-16 h-16 text-green-500"/>
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                </div>
                <div>
                    <h2 className="text-gray-100 mb-2">
                        {title ?? "Successfully Authenticated"}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {message ?? "You have been successfully verified and authenticated"}
                    </p>
                </div>
            </div>
        </div>
    );
}

SuccessPopup.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
}

export default SuccessPopup;