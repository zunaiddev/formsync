import {useForm} from 'react-hook-form';
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import login from "../../services/authService.js";
import loginImage from "../../assets/login.jpg"
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Checkbox from "../CheckBox/CheckBox.jsx";

function Login() {
    const navigate = useNavigate();
    const [clearPass, setClearPass] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        resetField
    } = useForm();

    async function onSubmit(data) {
        data.email = data.email.toLowerCase();
        let response = await login(data.email, data.password);
        console.log(response);
        setClearPass(!response.success);

        if (!response.success) {
            if (response.error.status === 401) {
                resetField("password");
            }
            return;
        }

        navigate("/dashboard");
    }

    return (
        <div className="h-[100vh] w-full flex justify-center items-center ">
            <div className="flex items-center justify-center md:w-200 md:h-120 bg-[#003049]">
                <img className="w-[40%] h-[100%]" src={loginImage} alt="side image"/>
                <div className="flex justify-center items-center    w-[60%] h-[100%]">
                    <form className="w-[70%] flex flex-col justify-center items-center gap-3"
                          onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            label="Email"
                            placeholder={"example@example.com"}
                            register={register("email", {
                                required: "Email is required",
                            })}
                            error={errors.email}/>

                        <InputField
                            label="Password"
                            placeholder={"password"}
                            type="password"
                            register={register("password", {
                                required: "Password is required",
                            })}
                            error={errors.password}
                            clear={clearPass}
                        />

                        <div className="flex justify-between items-center w-full px-1">
                            <Checkbox text="Remember Me"/>
                            <span className="justify-self-start text-blue-700 text-sm cursor-pointer hover:underline">
                                <Link to="/auth/forget-password">Forget Password</Link>
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
                </div>
            </div>
        </div>

    );
}

export default Login;