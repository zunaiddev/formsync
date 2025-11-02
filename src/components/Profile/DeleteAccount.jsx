import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {Trash2} from "lucide-react";
import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import {deleteUser} from "../../services/userService.js";
import {useNavigate} from "react-router-dom";
import {HttpStatusCode} from "axios";
import toast from "react-hot-toast";
import {showAccountDeletionInfo} from "../Popup/Popups.jsx";
import extractErrorInfo from "../../util/extractErrorInfo.js";

function DeleteAccount() {
    const {register, handleSubmit, formState: {errors}, setError} = useForm();
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            localStorage.removeItem("token");
            navigate("/auth/login", {replace: true});
            showAccountDeletionInfo();
        },
        onError: err => {
            const {status} = extractErrorInfo(err);
            if (status === HttpStatusCode.Unauthorized) {
                setError("password", {message: "Incorrect Password"});
            } else if (status) {
                toast.error("Something went wrong, please try again.");
            }
        }
    });

    function onSubmit(data) {
        mutate(data.password);
    }


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
                    })}
                    error={errors.password}
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    isSubmitting={isPending}
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    Delete Account
                </Button>
            </form>
        </div>
    );
}

export default DeleteAccount;