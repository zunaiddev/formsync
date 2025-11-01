import {useForm} from "react-hook-form";
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import {useMutation} from "@tanstack/react-query";
import SuccessPopup from "../Popup/SuccessPopup.jsx";
import ErrorPopup from "../Popup/ErrorPopup.jsx";
import {useEffect} from "react";
import {verifyToken} from "../../services/authService.js";

function ResetPasswordForm({token}) {
    const {register, watch, formState: {errors}, handleSubmit} = useForm();

    async function handleResetPassword(password) {
        const response = verifyToken(token, {password});

        return response.data;
    }

    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: handleResetPassword
    });

    useEffect(() => {
        console.log("error", error);
        console.log("status", isSuccess);
    }, [error, isSuccess]);

    function onSubmit(data) {
        mutate(data.password);
    }

    if (isSuccess) {
        return <SuccessPopup title="Password Changed Successfully"
                             message="Your password has been updated. You can now log in using your new password."/>
    }

    if (error) {
        const {tile: title, message} = error?.response?.data;
        return <ErrorPopup title={title} message={message}/>
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