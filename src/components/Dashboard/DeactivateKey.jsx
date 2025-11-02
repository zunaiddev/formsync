import {confirmDeactivateApiKey} from "../Popup/Popups.jsx";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateStatus} from "../../services/userService.js";
import Button from "../Button/Button.jsx";
import PropTypes from "prop-types";

function DeactivateKey({active, setActive}) {
    const {mutate, isPending} = useMutation({
        mutationFn: updateStatus,
        onSuccess: data => {
            setActive(data?.active);
        },
        onError: err => err.response && toast.error("Something went wrong!"),
    });

    async function handleDeactivate() {
        if (active && !await confirmDeactivateApiKey()) return;

        mutate(!active);
    }

    return (
        <Button onClick={handleDeactivate} isSubmitting={isPending}
                className={`${active ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hove:bg-blue-600"} text-white px-4 py-2 rounded-lg text-nowrap`}>
            {active ? "Deactivate" : "Activate"} Key
        </Button>
    );
}

DeactivateKey.propTypes = {
    active: PropTypes.bool.isRequired,
    setActive: PropTypes.func.isRequired,
}

export default DeactivateKey;