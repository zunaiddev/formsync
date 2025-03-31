import style from './button.module.css';
import PropTypes from "prop-types";


function Button({
                    type = "button", text, isSubmitting = false, onClick = () => {
    }
                }) {
    return (
        <div className={style.container}>
            <button type={type} className={style.button} disabled={isSubmitting} onClick={onClick}>
                {isSubmitting ? <span className={style.loader}></span> : text}
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