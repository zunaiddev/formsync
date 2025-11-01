import {useMutation} from "@tanstack/react-query";
import {reGenerateApiKey} from "../../services/userService.js";
import toast from "react-hot-toast";
import Button from "../Button/Button.jsx";
import {confirmRegenerateApiKey} from "../../util/popup.jsx";

function RegenerateKey({setKey}) {
    const {mutate, isPending} = useMutation({
        mutationFn: reGenerateApiKey,
        onSuccess: data => {
            setKey(data?.data.key);
            toast.success("Regenerate");
        },
        onError: _ => toast.error("Could not regenerate api key"),
    });

    async function handleRegenerate() {
        if (await confirmRegenerateApiKey()) mutate();
    }

    return (
        <Button onClick={handleRegenerate} isSubmitting={isPending}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-nowrap">
            Regenerate Key
        </Button>
    );
}

export default RegenerateKey;