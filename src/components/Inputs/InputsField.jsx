import style from './input.module.css';
import PropTypes from "prop-types";
import hideIcon from '../../assets/hide.svg';
import showIcon from '../../assets/show.svg';
import {useState} from "react";

function InputField({
                        label = "",
                        type = "text",
                        placeholder = "",
                        register = null,
                        error = null,
                        autoComplete = "off"
                    }) {
    const [isVisible, setVisible] = useState(false);

    return (
        <div className={style.container}>
            <label>{label}</label>
            <div className={style.inputContainer}>
                <input className={error ? style.inputError : ""}
                       type={type === "password" ? (isVisible ? "text" : "password") : type}
                       placeholder={placeholder}
                       autoComplete={autoComplete}
                       {...register}
                />
                {type === "password" && <img
                    src={isVisible ? hideIcon : showIcon}
                    alt="Toggle visibility"
                    className={style.toggleIcon}
                    onClick={() => setVisible(!isVisible)}
                />}
            </div>
            {error && <span>{error.message}</span>}
        </div>
    );
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    ref: PropTypes.object,
    autoComplete: PropTypes.string,
}

export default InputField;