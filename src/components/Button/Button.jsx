import PropTypes from "prop-types";
import ButtonLoader from "../Loader/ButtonLoader.jsx";
import {twMerge} from "tailwind-merge";

function Button({children, className, type = "button", icon: Icon, isSubmitting, onClick}) {
    return (
        <button type={type}
                className={twMerge("h-10 w-full flex justify-center items-center text-md text-white bg-[var(--button-background)] hover:bg-[var(--button-hover)] rounded-md cursor-pointer px-2 disabled:cursor-not-allowed ", className)}
                disabled={isSubmitting}
                onClick={onClick}>
            {isSubmitting ? <ButtonLoader/> : <div className="flex items-center">
                {Icon && <Icon className="size-4"/>}
                <span className="ml-2">
                  {children}
                </span>
            </div>}
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