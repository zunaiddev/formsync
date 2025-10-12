import Button from "../Button/Button.jsx";
import InputField from "../Inputs/InputsField.jsx";
import {useForm} from "react-hook-form";
import CheckIcon from "../Icon/CheckIcon.jsx";
import CrossIcon from "../Icon/CrossIcon.jsx";

function ResetPasswordForm() {
    const {
        register,
        watch,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({});

    const password = watch("password");
    const passwordRules = [
        {label: "At least 8 characters", isValid: password?.length >= 8},
        {label: "One uppercase letter (A-Z)", isValid: password ? /[A-Z]/.test(password) : false},
        {label: "One lowercase letter (a-z)", isValid: password ? /[a-z]/.test(password) : false},
        {label: "One number (0-9)", isValid: password ? /\d/.test(password) : false},
        {label: "One special character (!@#$&*)", isValid: password ? /[!@#$&*]/.test(password) : false},
    ];

    function onSubmit() {

    }

    return (
        <div
            className="text-white w-full max-w-sm bg-gray-800/95 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-800">
            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="text-2xl font-bold mb-1">Reset Password</h1>
                <p className="text-gray-400 text-sm">Enter a strong password to secure your account</p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
                autoComplete="on"
            >
                {/* Password Field */}
                <InputField
                    label="New Password"
                    placeholder="Enter new password"
                    type="password"
                    register={register("password", {
                        required: true,
                        pattern: {
                            value: /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,20}$/
                        },
                    })}
                    error={errors.password}
                />

                {/* Password Validation List */}
                <ul className="text-sm mt-2 space-y-2">
                    {passwordRules.map((rule, i) => {
                        return (
                            <li className={`flex items-center gap-2 ${rule.isValid ? "text-green-500" : "text-red-500"}`}
                                key={i}>

                                {rule.isValid ? <CheckIcon/> : <CrossIcon/>}
                                <span>{rule.label}</span>
                            </li>)
                    })}
                </ul>


                {/* Confirm Password */}
                <InputField
                    label="Confirm Password"
                    placeholder="Re-enter new password"
                    type="password"
                    register={register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) => value === watch("password") || "Passwords do not match",
                    })}
                    error={errors.confirmPassword}
                />

                {/* Submit Button */}
                <Button type="submit" text="Update Password" isSubmitting={isSubmitting}/>
            </form>
        </div>

    );
}

export default ResetPasswordForm;