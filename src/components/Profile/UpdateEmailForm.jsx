import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import {updateEmail} from "../../services/userService.js";
import toast from "react-hot-toast";
import {HttpStatusCode} from "axios";
import {showEmailUpdateVerificationPopup} from "../Popup/Popups.jsx";

function UpdateEmailForm({email}) {
    const {register, handleSubmit, formState: {errors}, reset, setError} = useForm();

    const {mutate, isPending} = useMutation({
        mutationFn: updateEmail,
        onSuccess: data => {
            reset();
            showEmailUpdateVerificationPopup(data.email);
        },
        onError: err => {
            let status = err?.response?.status;

            if (status === HttpStatusCode.Unauthorized) {
                setError("password", {message: "Password is Incorrect"});
            } else if (status === HttpStatusCode.Conflict) {
                setError("email", {message: "This Email is Required"});
            } else if (status) {
                toast.error("Something Went Wrong");
            }
        }
    });

    function onSubmit(data) {
        mutate({password: data.password.trim(), email: data.email.trim()});
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border-white/10 bg-white/5 p-6 rounded-lg border">
            <h2 className="text-lg font-semibold text-zinc-100">Update Email</h2>

            <InputField
                label="New Email"
                placeholder="example@mail.com"
                register={register("email", {
                    required: "Email is required",
                    pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email"},
                    validate: value => value.toString() !== email || "Please use a different email address.",
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