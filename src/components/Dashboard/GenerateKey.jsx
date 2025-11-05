import Button from "../Button/Button.jsx";
import {generateApiKey} from "../../services/userService.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

function GenerateKey() {
    const client = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: generateApiKey,
        onSuccess: data => {
            client.setQueryData(["api-key"], data);
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