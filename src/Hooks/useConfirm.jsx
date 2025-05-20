import {useState} from "react";
import PopupModel from "../components/Model/PopupModel.jsx";

function useConfirm() {
    const [dialogState, setDialogState] = useState(null);

    function confirm(message, desc = "") {
        return new Promise((resolve) => {
            setDialogState({message, desc, resolve});
        });
    }

    function handleSubmit() {
        dialogState.resolve(true);
        setDialogState(null);
    }

    function handleClose() {
        dialogState.resolve(false);
        setDialogState(null);
    }

    const Confirmation = dialogState ? <PopupModel
        message={dialogState.message}
        desc={dialogState.desc}
        onClose={handleClose}
        onSubmit={handleSubmit}/> : null;

    return [confirm, Confirmation];
}

export default useConfirm;