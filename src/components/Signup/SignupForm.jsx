import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import {useForm} from "react-hook-form";
import {signup} from "../../services/authService.js";
import {useNavigate} from "react-router-dom";
import {HttpStatusCode} from "axios";
import AuthForm from "../AuthForm/AuthForm.jsx";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";

function SignupForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        setError,
    } = useForm({
        defaultValues: {
            name: "John Doe",
            email: "john@example.com",
            password: "John@123",
            confirmPassword: "John@123",
        }
    });

    const {mutate, isPending} = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            toast.success("Please Verify Your email.", {});
            navigate("/verify-email");
        },
        onError: error => {
            const status = error?.response?.status;

            if (status === HttpStatusCode.Conflict) {
                setError("email", {
                    type: "manual",
                    message: "User with email Exists."
                }, {shouldFocus: true});
            }
        }
    });

    async function onSubmit(data) {
        mutate(data);
    }

    return (
        <AuthForm>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                <InputField
                    label="Name"
                    placeholder="Full name"
                    register={register("name", {
                        required: "Name is required",
                        pattern: {value: /^[a-zA-Z\s'-]+$/, message: "Invalid name"},
                        minLength: {value: 3, message: "Minimum 3 characters"},
                        maxLength: {value: 50, message: "Maximum 50 characters"},
                        validate: (value) => value.toString().trim().length > 3 || "Name can't be empty",
                    })}
                    error={errors.name}
                    autoComplete="given-name"
                />

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

                <InputField
                    label="Password"
                    placeholder="Password"
                    type="password"
                    register={register("password", {
                        required: "Password is required",
                        pattern: {
                            value: /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,20}$/,
                            message: "Weak password",
                        },
                    })}
                    error={errors.password}
                    autoComplete="new-password"
                />

                <InputField
                    label="Confirm Password"
                    placeholder="Confirm password"
                    type="password"
                    register={register("confirmPassword", {
                        required: "Password confirmation required",
                        validate: (value) => value === watch("password") || "Passwords do not match",
                    })}
                    error={errors.confirmPassword}
                    autoComplete="confirm-password"
                />

                <Button type="submit" isSubmitting={isPending}>
                    Sign up
                </Button>
            </form>
        </AuthForm>
    );
}

export default SignupForm;