import {Link} from "react-router-dom";

function LinkField({label, linkText, to}) {
    return (
        <p className="text-center text-xs text-gray-400 mt-2">
            {label && label + "? "}
            <Link
                to={to}
                className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
            >
                {linkText}
            </Link>
        </p>
    );
}

export default LinkField;