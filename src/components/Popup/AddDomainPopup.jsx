import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import {X} from "lucide-react";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {addDomain} from "../../services/userService.js";
import toast from "react-hot-toast";
import extractErrorInfo from "../../util/extractErrorInfo.js";
import {HttpStatusCode} from "axios";

function AddDomainPopup({domains, setDomains, hide}) {
    const {register, handleSubmit, formState: {errors}, setError} = useForm();

    const {mutate, isPending} = useMutation({
        mutationFn: addDomain,
        onSuccess: data => {
            setDomains(data.domains);
            toast.success("Domain Added");
            hide();
        },
        onError: error => {
            const {status} = extractErrorInfo(error);

            if (status === HttpStatusCode.Conflict) {
                setError("domain", {message: "The domain already exists"});
            } else if (status) {
                toast.error("Request failed with status " + status);
            }
        }
    });

    function onSubmit(data) {
        mutate(data.domain.toString().trim());
    }

    return (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-400/40">
            <div className="relative w-full max-w-md bg-gray-800 p-4 rounded-lg text-white">
                <h1 className="font-bold text-lg mb-4">Enter Custom Domain</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="Enter Domain"
                                placeholder="formsync.netlify.app"
                                register={register("domain", {
                                    required: "Please enter domain name",
                                    pattern: {
                                        value: /^(localhost|((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,})$/,
                                        message: "Please enter valid domain name",
                                    },
                                })}
                                error={errors.domain}
                    />

                    <div className="w-full flex justify-end mt-4 gap-3">
                        <Button className="bg-gray-500/30 hover:bg-gray-500/20"
                                onClick={hide} disabled={isPending}
                                type="button">
                            Cancel
                        </Button>

                        <Button type="submit" isSubmitting={isPending}>
                            Add Domain
                        </Button>
                    </div>
                </form>

                <button className="r-3 absolute right-3 top-2 cursor-pointer" onClick={hide} disabled={isPending}>
                    <X/>
                </button>
            </div>
        </div>
    );
}

export default AddDomainPopup;