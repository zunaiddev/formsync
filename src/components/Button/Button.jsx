import PropTypes from "prop-types";


function Button({
                    type = "button", text, isSubmitting = false, onClick = () => {
    }
                }) {
    return (
        <div className="h-8 w-full">
            <button type={type}
                    className="h-full w-full flex justify-center items-center text-md text-white bg-[var(--button-background)] hover:bg-[var(--button-hover)] rounded-md cursor-pointer"
                    disabled={isSubmitting}
                    onClick={onClick}>
                {isSubmitting ? <span
                    className="size-[15px] border-3 border-b-transparent rounded-full animate-spin"></span> : text}
            </button>
        </div>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isSubmitting: PropTypes.bool,
}

export default Button;