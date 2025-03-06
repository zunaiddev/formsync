import style from './login.module.css';
import {useForm} from 'react-hook-form';
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import login from "../../services/authService.js";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import logo from "../../assets/logo.png";

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
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.header}>
                    <img src={logo} alt="logo"/>
                    <h1>login</h1>
                </div>

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

                <Button type="submit" text="login"
                        onClick={() => console.log("Submit")}
                        isSubmitting={isSubmitting}/>
                <p><Link to={"/signup"} className={style.switch}>Don&#39;t Have an account? signup</Link></p>
            </form>
        </div>
    );
}

export default Login;