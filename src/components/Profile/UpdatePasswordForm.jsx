import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import toast from "react-hot-toast";
import {updatePassword} from "../../services/userService.js";
import LinkField from "../LinkField/LinkField.jsx";
import {HttpStatusCode} from "axios";

function UpdatePasswordForm() {
    const {register, handleSubmit, formState: {errors}, watch, reset, setError}
        = useForm();

    const {mutate, isPending} = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            reset();
            toast.success("Password updated successfully.");
        },
        onError: err => {
            let status = err?.response.status;
            if (status === HttpStatusCode.Unauthorized)
                setError("password", {
                    message: "Password is Incorrect",
                })
        }
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 border-white/10 bg-white/5 p-6 rounded-lg border">
            <h2 className="text-lg font-semibold text-zinc-100">Update Password</h2>

            <InputField
                label="Current Password"
                placeholder="Enter current password"
                type="password"
                register={register("password", {
                    required: "Current password is required"
                })}
                error={errors.password}
                autoComplete="current-password"
            />

            <InputField
                label="New Password"
                placeholder="Enter new password"
                type="password"
                register={register("newPassword", {
                    required: "New password is required",
                    pattern: {
                        value: /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,20}$/,
                        message: "Weak password",
                    },
                    validate: value => value.toString() !== watch("password") || "New Password cannot same as current password.",
                })}
                error={errors.newPassword}
                autoComplete="new-password"
            />

            <InputField
                label="Confirm New Password"
                placeholder="Re-enter new password"
                type="password"
                register={register("confirmNewPassword", {
                    required: "Please confirm your new password",
                    validate: value => value.toString() === watch("newPassword") || "Password does not match",
                })}
                error={errors.confirmNewPassword}
                autoComplete="new-password"
            />
            <div className="w-full flex justify-end -mt-4   ">
                <LinkField linkText="Forget Password" to="/forget-password"/>
            </div>

            <Button type="submit" isSubmitting={isPending}>
                Update Password
            </Button>
        </form>
    );
}

export default UpdatePasswordForm;