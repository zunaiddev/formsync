import {useForm} from 'react-hook-form';
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import {login} from "../../services/authService.js";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import ErrorType from "../../util/ErrorType.js";
import {HttpStatusCode} from "axios";
import AuthForm from "../AuthForm/AuthForm.jsx";

function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        resetField
    } = useForm();

    async function onSubmit(data) {
        data.email = data.email.toLowerCase();
        let {data: resData, error} = await login(data);


        if (resData) {
            localStorage.setItem("accessToken", resData.data.token);
            navigate("/dashboard");
            return;
        }

        if (error.type === ErrorType.server) {
            if (error.status === HttpStatusCode.Unauthorized) {
                toast.error("Invalid email or password");
                resetField("password");
                return;
            } else if (error.status === HttpStatusCode.Forbidden) {
                toast.error("Please Verify Your Email.");
            } else {
                toast.error("Unexpected Server Error");
            }

            return;
        }

        if (error.type === ErrorType.network) {
            toast.error("Server Not Responding");
        } else {
            toast.error("Something went wrong");
        }
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


            <Button type="submit" text="login"
                    isSubmitting={isSubmitting}/>
        </form>
    </AuthForm>);
}

export default Login;