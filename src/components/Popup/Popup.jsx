import {useForm} from "react-hook-form";
import {XMarkIcon} from "@heroicons/react/24/solid/index.js";
import PropTypes from "prop-types";

const Popup = ({topLabel, name, label, placeholder, btnText, validation, isOpen, onSubmit, onClose}) => {
    const {
        register,
        reset,
        formState: {errors, isSubmitting},
        handleSubmit,
    } = useForm();

    if (!isOpen) return null;

    const submit = async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    };

    return (
        isOpen && (<div onClick={onClose}
                        className="backdrop-blur-sm overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full" onClick={(e) => e.stopPropagation()}>

                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div
                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        {topLabel && <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {topLabel}
                        </h3>}
                        <button onClick={onClose}
                                className="end-2.5 text-gray-400 bg-transparent rounded-md text-sm w-6 h-6 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white cursor-pointer">
                            <XMarkIcon
                                className="size-5"/>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
                            <div>
                                {label && <label
                                    className="block mb-2 text-sm font-medium text-white">{label}</label>}
                                <input name="email"
                                       className="border text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                       placeholder={placeholder} {...register(name, validation)}/>
                                {errors[name] && <small className="text-red-600 ml-1">{errors[name].message}</small>}
                            </div>
                            <button type="submit" disabled={isSubmitting}
                                    className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 cursor-pointer">
                                {isSubmitting ? "Submitting" : (btnText || "Submit")}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
    );
};

Popup.propTypes = {
    topLabel: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    btnText: PropTypes.string,
    validation: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
}

export default Popup;
