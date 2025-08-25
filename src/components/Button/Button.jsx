import PropTypes from "prop-types";
import ButtonLoader from "../Loader/ButtonLoader.jsx";


function Button({className, type = "button", text, icon: Icon, isSubmitting, onClick}) {
    return (
        <button type={type}
                className={`h-8 w-full flex justify-center items-center text-md text-white bg-[var(--button-background)] hover:bg-[var(--button-hover)] rounded-md cursor-pointer px-2 ${className}`}
                disabled={isSubmitting}
                onClick={onClick}>
            {isSubmitting ? <ButtonLoader/> : <>
                {Icon && <Icon className={`size-4 ${text && "mr-2"}`}/>}
                {text}
            </>}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    isSubmitting: PropTypes.bool,
}

export default Button;