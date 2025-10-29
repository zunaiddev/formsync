import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";

function UpdatePasswordForm() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const {mutate, isPending} = useMutation({
        mutationFn: async (data) => {
            const res = await fetch("/api/user/update-password", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to update password");
            return res.json();
        },
        onSuccess: () => {
            reset();
            alert("Password updated successfully.");
        },
    });

    const onSubmit = (data) => {
        if (data.newPassword !== data.confirmNewPassword) {
            return alert("New passwords do not match.");
        }
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border-white/10 bg-white/5 p-6 rounded-lg border">
            <h2 className="text-lg font-semibold text-zinc-100">Update Password</h2>

            <InputField
                label="Current Password"
                placeholder="Enter current password"
                type="password"
                register={register("currentPassword", {
                    required: "Current password is required"
                })}
                error={errors.currentPassword}
                autoComplete="current-password"
            />

            <InputField
                label="New Password"
                placeholder="Enter new password"
                type="password"
                register={register("newPassword", {
                    required: "New password is required",
                    minLength: {value: 6, message: "Minimum 6 characters"}
                })}
                error={errors.newPassword}
                autoComplete="new-password"
            />

            <InputField
                label="Confirm New Password"
                placeholder="Re-enter new password"
                type="password"
                register={register("confirmNewPassword", {
                    required: "Please confirm your new password"
                })}
                error={errors.confirmNewPassword}
                autoComplete="new-password"
            />

            <Button type="submit" isSubmitting={isPending}>
                Update Password
            </Button>
        </form>
    );
}

export default UpdatePasswordForm;