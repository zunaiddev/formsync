import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";

function UpdateEmailForm() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const {mutate, isPending} = useMutation({
        mutationFn: async (data) => {
            const res = await fetch("/api/user/update-email", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to update email");
            return res.json();
        },
        onSuccess: () => {
            // After success, reset form fields
            reset();
            alert("A verification email has been sent to your new email address.");
        },
    });

    const onSubmit = (data) => mutate(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border-white/10 bg-white/5 p-6 rounded-lg border">
            <h2 className="text-lg font-semibold text-zinc-100">Update Email</h2>

            <InputField
                label="New Email"
                placeholder="example@mail.com"
                register={register("email", {
                    required: "Email is required",
                    pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email"}
                })}
                error={errors.email}
                autoComplete="email"
            />

            <InputField
                label="Your Password"
                placeholder="Enter current password"
                type="password"
                register={register("password", {
                    required: "Password is required",
                    minLength: {value: 6, message: "Minimum 6 characters"}
                })}
                error={errors.password}
                autoComplete="current-password"
            />

            <p className="text-xs text-zinc-500">
                A verification email will be sent to your new email address.
            </p>

            <Button type="submit" isSubmitting={isPending}>
                Update Email
            </Button>
        </form>
    );
}

export default UpdateEmailForm;