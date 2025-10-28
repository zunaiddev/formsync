import {useForm} from "react-hook-form";
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import {useMutation} from "@tanstack/react-query";
import API from "../../api.js";
import SuccessPopup from "../Popup/SuccessPopup.jsx";

function ResetPasswordForm({token}) {
    const {register, watch, formState: {errors}, handleSubmit} = useForm();

    const {isPending, isSuccess, isError} = useMutation({
        mutationFn: () => {
            const response = API.post(`/verify?${token}`);
            return response.data;
        },
        onError: error => {

        }
    });

    function onSubmit(data) {
        console.log("data", data);
    }

    if (isSuccess) {
        return <SuccessPopup title="Password Changed Successfully"
                             message="Your password has been updated. You can now log in using your new password."/>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md bg-gray-800 border border-gray-200/30 p-3 space-y-6 rounded-md">
            <InputField label="Enter Password" type="password"
                        register={register("password", {
                            required: "Password is required",
                        })} error={errors.password}/>
            <InputField label="Confirm Password" type="password"
                        register={register("confirmPassword", {
                            validate: (value) => value === watch("password") || "Password doesn't match"
                        })} error={errors.confirmPassword}/>
            <Button type="submit" isSubmitting={isPending}>
                Reset Password
            </Button>
        </form>
    );
}


export default ResetPasswordForm;