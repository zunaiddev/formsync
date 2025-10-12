import InputField from "../Inputs/InputsField.jsx";
import {useForm} from "react-hook-form";
import Button from "../Button/Button.jsx";
import toast from "react-hot-toast";
import {forgetPassword} from "../../services/authService.js";
import LinkField from "../LinkField/LinkField.jsx";

function ForgetPasswordForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm();

    async function onSubmit(data) {
        let success = await forgetPassword(data.email.toLowerCase());

        if (success) {
            toast.success("Password Reset Email sent.");
            reset();
        } else {
            toast.error("Invalid email address");
        }
    }

    return (
        <div
            className="text-white w-full max-w-sm bg-gray-950/80 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-800">

            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="text-2xl font-bold mb-1">Reset Password</h1>
                <p className="text-gray-400 text-sm">Enter your email to receive a password reset link</p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
                autoComplete="on"
            >
                <InputField
                    label="Email"
                    placeholder="example@example.com"
                    register={register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email",
                        },
                    })}
                    error={errors.email}
                    autoComplete="email"
                />

                <Button type="submit" text="Submit" isSubmitting={isSubmitting}/>
                <LinkField label="Remembered your password" linkText="Sign in" to="/auth/signin"/>
            </form>
        </div>
    );
}

export default ForgetPasswordForm;