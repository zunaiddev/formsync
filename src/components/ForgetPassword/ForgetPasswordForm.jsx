import InputField from "../Inputs/InputsField.jsx";
import {useForm} from "react-hook-form";
import Button from "../Button/Button.jsx";

function ForgetPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm();

    async function onSubmit() {
        console.log("Submitted");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="w-90 min-h-40 bg-gray-900 p-5 flex flex-col items-center gap-6 rounded-lg">
            <InputField
                label="Email"
                placeholder="example@example.com"
                register={register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email"
                    },
                })}
                error={errors.email}
            />

            <Button type="submit" text="submit" isSubmitting={isSubmitting}/>
        </form>
    );
}

export default ForgetPasswordForm;