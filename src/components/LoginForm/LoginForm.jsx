import {useForm} from 'react-hook-form';
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import {login} from "../../services/authService.js";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {HttpStatusCode} from "axios";
import AuthForm from "../AuthForm/AuthForm.jsx";
import {useMutation} from "@tanstack/react-query";

function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        resetField
    } = useForm();

    const {mutate, isPending} = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem("accessToken", data.token);
            navigate("/dashboard");
        },
        onError: error => {
            let status = error.response.status;

            if (status === HttpStatusCode.Unauthorized) {
                resetField("password");
                toast.error("Invalid Email or Password");
            } else {
                toast.error("Something went wrong");
            }
        }
    });

    async function onSubmit(data) {
        mutate(data);
    }

    return (<AuthForm isSignup={false}>
        <form className="w-full flex flex-col justify-center items-center gap-5"
              onSubmit={handleSubmit(onSubmit)} autoComplete="on">
            <InputField
                name="email"
                label="Email"
                placeholder={"example@example.com"}
                register={register("email", {
                    required: "Email is required",
                })}
                error={errors.email}
                autoComplete="email"
            />

            <div className="w-full flex items-end flex-col gap-2">
                <InputField
                    name="password"
                    label="Password"
                    placeholder={"password"}
                    type="password"
                    register={register("password", {
                        required: "Password is required",
                    })}
                    error={errors.password}
                    autoComplete="password"
                />


                <span className="text-blue-600 text-sm cursor-pointer hover:underline">
                                <Link to="/forget-password">Forget Password</Link>
            </span>
            </div>


            <Button type="submit" isSubmitting={isPending}>
                Sign in
            </Button>
        </form>
    </AuthForm>);
}

export default Login;