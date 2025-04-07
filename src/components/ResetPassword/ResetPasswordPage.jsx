import Button from "../Button/Button.jsx";
import InputField from "../Inputs/InputsField.jsx";
import {useForm} from "react-hook-form";

function ResetPasswordForm() {
    const {
        register,
        watch,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({})

    function onSubmit() {

    }


    return (<form onSubmit={handleSubmit(onSubmit)}
                  className="w-90 min-h-40 bg-gray-900 p-5 flex flex-col items-center gap-6 rounded-lg">
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
            errors.password && <ul className="text-white w-full text-sm">
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

        <Button type="submit" text="Submit" isSubmitting={isSubmitting}/>
    </form>);
}

export default ResetPasswordForm;