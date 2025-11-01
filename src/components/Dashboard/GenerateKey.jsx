import Button from "../Button/Button.jsx";
import {generateApiKey} from "../../services/userService.js";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";

function GenerateKey() {
    const {mutate, isPending} = useMutation({
        mutationFn: generateApiKey,
        onSuccess: data => {
            toast.success("Successfully generated api key!");
        }
    });

    return (
        <Button isSubmitting={isPending} onClick={mutate}>
            Generate key
        </Button>
    );
}

export default GenerateKey;