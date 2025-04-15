import {useForm} from 'react-hook-form';
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import login from "../../services/authService.js";
import {Link, useNavigate} from "react-router-dom";
import Checkbox from "../CheckBox/CheckBox.jsx";
import toast from "react-hot-toast";

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
        let response = await login(data.email, data.password);


        if (response.success) {
            localStorage.setItem("accessToken", response.token);
            navigate("/dashboard");
        }

        if (response.status === 500) {
            toast.error("server Not responding");
            return;
        }

        if (response.status === 401) {
            toast.error("Invalid email or password");
            resetField("password");
            return;
        }

        if (response.status === 403) {
            toast.error("Please Verify Your Email.");
        }
    }

    return (<div className="w-full flex justify-center items-center p-3 ">
        <form className="w-full flex flex-col justify-center items-center gap-5"
              onSubmit={handleSubmit(onSubmit)} autoComplete="on">
            <InputField
                label="Email"
                placeholder={"example@example.com"}
                register={register("email", {
                    required: "Email is required",
                })}
                error={errors.email}
                autoComplete="email"
            />

            <InputField
                label="Password"
                placeholder={"password"}
                type="password"
                register={register("password", {
                    required: "Password is required",
                })}
                error={errors.password}
                autoComplete="current-password"
            />

            <div className="flex justify-between items-center w-full px-1">
                <Checkbox text="Remember Me"/>
                <span className="justify-self-start text-blue-700 text-sm cursor-pointer hover:underline">
                                <Link to="/forget-password">Forget Password</Link>
                </span>
            </div>

            <Button type="submit" text="login"
                    onClick={() => console.log("Submit")}
                    isSubmitting={isSubmitting}/>
            <p><Link to={"/auth/signup"} className="text-white">
                Don&#39;t Have an account? <span
                className="text-blue-700 hover:underline hover:text-blue-800">signup</span>
            </Link></p>
        </form>
    </div>);
}

export default Login;