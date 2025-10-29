import InputField from "../Inputs/InputsField.jsx";
import {useForm} from "react-hook-form";
import Button from "../Button/Button.jsx";
import toast from "react-hot-toast";
import {forgetPassword} from "../../services/authService.js";
import LinkField from "../LinkField/LinkField.jsx";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import extractInfo from "../../util/extractInfo.js";

function ForgetPasswordForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
    } = useForm();

    const {mutate, isPending} = useMutation({
        mutationFn: forgetPassword,
        onSuccess: _ => {
            toast.success("Password reset Email sent.");
            navigate("/check-email?from=forgetPassword", {replace: true});
        },
        onError: error => {
            const {status, code} = extractInfo(error);
            console.log("status:", status);
            console.log("code:", code);

            if (code === "USER_NOT_FOUND") {
                setError("email", {
                    message: "Cound Not Found User With email"
                }, {shouldFocus: true});
            } else if (code === "DISABLED") {
                toast("Please verify Your Email first.");
                navigate("/auth/signup", {replace: true});
            }
        }
    })

    async function onSubmit(data) {
        mutate(data.email.toLowerCase());
    }

    return (
        <div
            className="text-white w-full max-w-sm bg-gray-900 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-800">

            <div className="text-center mb-5">
                <h1 className="text-2xl font-bold mb-1">Reset Password</h1>
                <p className="text-gray-400 text-sm">Enter your email to receive a password reset link</p>
            </div>

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

                <Button type="submit" isSubmitting={isPending}>
                    Submit
                </Button>
                <LinkField label="Remembered your password" linkText="Sign in" to="/auth/login"/>
            </form>
        </div>
    );
}

export default ForgetPasswordForm;