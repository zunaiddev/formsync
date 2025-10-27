import PropTypes from "prop-types";
import {AlertTriangle, XCircle} from "lucide-react";

function ErrorPopup({type, title, message}) {
    console.log("title", title);
    console.log("message", message);

    return (
        <div
            className={`bg-gray-900 rounded-lg border border-${type === "warning" ? "yellow" : "red"}-900/50 p-8 shadow-2xl`}>
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                    {type === 'warning' ? (
                        <AlertTriangle className="w-16 h-16 text-yellow-500"/>
                    ) : (
                        <XCircle className="w-16 h-16 text-red-500"/>
                    )}
                    <div className={`absolute inset-0 ${
                        type === 'warning'
                            ? 'bg-yellow-500/20'
                            : 'bg-red-500/20'
                    } rounded-full blur-xl`}></div>
                </div>
                <div>
                    <h2 className="text-gray-100 mb-2">
                        {title}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}

ErrorPopup.propTypes = {
    type: PropTypes.oneOf(['warning']),
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}

export default ErrorPopup;