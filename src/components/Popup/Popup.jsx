import {useForm} from "react-hook-form";
import Button from "../Button/Button.jsx";
import InputField from "../Inputs/InputsField.jsx";
import {XMarkIcon} from "@heroicons/react/16/solid/index.js";

const Popup = ({isOpen, onSubmit, onClose, label, placeholder}) => {
    const {
        register,
        reset,
        formState: {errors, isSubmitting},
        handleSubmit,
    } = useForm();

    if (!isOpen) return null;

    const submit = (data) => {
        onSubmit(data.domain);
        reset();
        onClose();
    };

    return (
        <div
            className="flex justify-center items-center w-full h-full absolute top-[50%] left-[50%] translate-[-50%] backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="border px-4 pt-6 pb-3 rounded-lg transition duration-500 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit(submit)} className="w-80 space-y-4">
                    <InputField
                        label={label || "Domain name"}
                        placeholder={placeholder || "www.example.com"}
                        register={register("domain", {
                            required: "Domain is required",
                            pattern: {
                                value: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "Invalid domain name",
                            },
                        })}
                        error={errors.domain}
                    />
                    <Button text="submit" isSubmitting={isSubmitting} type="submit"/>
                </form>
                <XMarkIcon
                    className="h-5 w-5 absolute top-1 right-1 cursor-pointer"
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export default Popup;
