import PropTypes from "prop-types";
import {twMerge} from "tailwind-merge";
import ButtonLoader from "../Loader/ButtonLoader.jsx";

function Button({children, className, type = "button", icon: Icon, isSubmitting, onClick}) {
    return (
        <button type={type}
                className={twMerge("relative h-10 flex justify-center items-center text-md text-white bg-[var(--button-background)] hover:bg-[var(--button-hover)] rounded-md cursor-pointer px-2.5 disabled:cursor-not-allowed", className, isSubmitting && "text-transparent")}
                disabled={isSubmitting}
                onClick={onClick}>
            {Icon && <Icon className="size-4"/>}
            {children}
            {isSubmitting && <ButtonLoader className="absolute"/>}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    isSubmitting: PropTypes.bool,
}

export default Button;