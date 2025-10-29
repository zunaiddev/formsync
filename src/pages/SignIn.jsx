import {useForm} from 'react-hook-form';
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {HttpStatusCode} from "axios";
import {useMutation} from "@tanstack/react-query";
import {login} from "../services/authService.js";
import AuthForm from "../components/AuthForm/AuthForm.jsx";
import InputField from "../components/Inputs/InputsField.jsx";
import Button from "../components/Button/Button.jsx";

function SignIn() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
        resetField,
        setFocus
    } = useForm({
        defaultValues: {
            email: "john@example.com",
            password: "John@123",
        }
    });

    const {mutate, isPending} = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const result = data.data;
            localStorage.setItem("token", result.token);
            navigate("/dashboard", {replace: true});
        },
        onError: error => {
            const status = error?.response.status;

            if (status === HttpStatusCode.Unauthorized) {
                resetField("password");
                setFocus("password");
                toast.error("Invalid Email or Password", {
                    duration: 2000,
                });
            } else if (status === HttpStatusCode.Locked) {
                toast("Your account is locked. connect with us", {
                    duration: 10000
                });
            } else if (status === HttpStatusCode.BadRequest) {
                toast("Please Verify Your Email address first. or signup again")
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

export default SignIn;