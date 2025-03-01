import style from './login.module.css';
import {useForm} from 'react-hook-form';
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import login from "../../services/authService.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm();

    async function onSubmit(data) {
        data.email = data.email.toLowerCase();
        let response = await login(data.email, data.password);
        console.log(response);

        if (!response.success) {
            // reset();
            toast.error(response.error,);
            return;
        }

        navigate("/dashboard");
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Name"
                    placeholder={"Full name"}
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
                    error={errors.password}/>

                <Button type="submit" text="login"
                        onClick={() => console.log("Submit")}
                        isSubmitting={isSubmitting}/>
            </form>
        </div>
    );
}

export default Login;