import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import {useForm} from "react-hook-form";
import {isAvailable, signup} from "../../services/authService.js";
import {Link, useNavigate} from "react-router-dom";
import loginImage from "../../assets/login.jpg";

function SignupForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
    } = useForm();

    async function checkAvailability(email) {
        return await isAvailable(email) || "Unavailable";
    }

    async function onSubmit(data, e) {
        e.preventDefault();
        let response = await signup(data.name, data.email, data.password);
        console.log(response);
        if (response.error != null) {
            return;
        }
        navigate("/auth/verify");
    }

    return (
        <div className="h-[100vh] w-full flex justify-center items-center ">
            <div className="flex items-center justify-center md:w-200 md:h-120 bg-[#003049]">
                <img className="w-[40%] h-[100%]" src={loginImage} alt="side image"/>
                <div className="flex justify-center items-center    w-[60%] h-[100%]">
                    <form className="w-[70%] flex flex-col justify-center items-center gap-3"
                          onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            label="Name"
                            placeholder={"Full name"}
                            register={register("name", {
                                required: "Name is required",
                                pattern: {value: /^[a-zA-Z\s'-]+$/, message: "Invalid name"},
                                minLength: {value: 3, message: "Minimum 3 characters"},
                                maxLength: {value: 50, message: "Maximum 50 characters"},
                                validate: (value) => value.toString().trim().length > 3 || "Name can't be empty",
                            })}
                            error={errors.name}/>
                        <InputField
                            label="Email"
                            placeholder="example@example.com"
                            register={register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email"
                                },
                                validate: {
                                    checkAvailability: async email => checkAvailability(email),
                                }
                            })}
                            error={errors.email}
                        />

                        <InputField
                            label="Password"
                            placeholder="Password"
                            type="password"
                            register={
                                register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,20}$/,
                                        message: ""
                                    }
                                })
                            }
                            error={errors.password}
                        />

                        {
                            errors.password && <ul>
                                <li>Must be at least 8 characters long.</li>
                                <li>Must contain an uppercase letter.</li>
                                <li>Must contain an lowercase letter</li>
                                <li>Must contain a number</li>
                                <li>Must contain a special character</li>
                            </ul>
                        }


                        <InputField
                            label={"Confirm Password"}
                            placeholder={"Confirm Password"}
                            type="password"
                            register={register("confirmPassword", {
                                required: "Password do not match",
                                validate: value => value === watch("password") || "Password do not match",
                            })}
                            error={errors.confirmPassword}
                        />

                        <Button type="submit" text="signup" isSubmitting={isSubmitting}/>
                        <p><Link to={"/auth/login"} className="text-white">
                            Don&#39;t Have an account? <span
                            className="text-blue-700 hover:underline hover:text-blue-800">login</span>
                        </Link></p>
                    </form>

                </div>
            </div>
        </div>

    );
}

export default SignupForm;