import {useState} from "react";
import PopupModel from "../components/Model/PopupModel.jsx";

function useConfirm() {
    const [dialogState, setDialogState] = useState(null);

    function confirm(message, desc = "", custom = null, buttonText) {
        return new Promise((resolve) => {
            setDialogState({message, desc, custom, resolve, buttonText});
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
        custom={dialogState.custom}
        onClose={handleClose}
        onSubmit={handleSubmit}
        buttonText={dialogState.buttonText}/> : null;

    return [confirm, Confirmation];
}

export default useConfirm;