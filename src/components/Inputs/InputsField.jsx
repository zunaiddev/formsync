import PropTypes from "prop-types";
import hideIcon from '../../assets/hide.svg';
import showIcon from '../../assets/show.svg';
import {useState} from "react";

function InputField({
                        name,
                        label = "",
                        type = "text",
                        placeholder = "",
                        register = null,
                        error = null,
                        autoComplete = "off"
                    }) {
    const [isVisible, setVisible] = useState(false);

    return (
        <div className="w-full text-white">
            <small>{label}</small>
            <div className="flex items-center justify-between relative">
                <input
                    className={`w-full h-8 border rounded-sm bg-gray-800 pl-1 pr-7 py-4 text-sm outline-none ${error && "border-red-600"}`}
                    type={type === "password" ? (isVisible ? "text" : "password") : type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    name={name}
                    {...register}
                />
                {type === "password" &&
                    <img
                        src={isVisible ? hideIcon : showIcon}
                        alt="Toggle visibility"
                        className="size-4 absolute right-2 cursor-pointer"
                        onClick={() => setVisible(!isVisible)}
                    />}
            </div>
            {error && <small className="text-red-600">{error.message}</small>}
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