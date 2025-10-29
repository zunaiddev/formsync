import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {Trash2} from "lucide-react";
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";

function DeleteAccount() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const {mutate, isPending} = useMutation({
        mutationFn: async (data) => {
            const res = await fetch("/api/user/delete-account", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to delete account");
            return res.json();
        },
        onSuccess: () => {
            reset();
            alert("Your account is scheduled for permanent deletion.");
            // optionally redirect: window.location.href = "/logout";
        },
    });

    const onSubmit = (data) => mutate(data);

    return (
        <div className="w-full p-6 rounded-xl border border-red-600/30 bg-red-600/10 space-y-5">
            <div className="flex items-center gap-3 text-red-400">
                <Trash2 className="size-6"/>
                <h2 className="text-lg font-semibold">Delete Account</h2>
            </div>

            <p className="text-sm text-red-300 leading-relaxed">
                This action is <span className="font-semibold text-red-200">permanent</span>.
                Once your account is deleted, all your data will be permanently removed and
                cannot be recovered. You will lose access to all services.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <InputField
                    label="Enter your password to confirm"
                    placeholder="Current password"
                    type="password"
                    register={register("password", {
                        required: "Password is required",
                        minLength: {value: 6, message: "Minimum 6 characters"}
                    })}
                    error={errors.password}
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    isSubmitting={isPending}
                    className="!bg-red-600 hover:!bg-red-700 text-white"
                >
                    Permanently Delete Account
                </Button>
            </form>
        </div>
    );
}

export default DeleteAccount;