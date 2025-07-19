import useConfirm from "../../Hooks/useConfirm.jsx";
import Popup from "../Popup/Popup.jsx";
import {useState} from "react";

function SettingsPage() {
    const [confirm, Confirmation] = useConfirm();
    const [showPopup, setShowPopup] = useState(false);

    async function handleDelete() {
        const result = await confirm("Are You Sure You want to delete Your Account.", "You can never recover it later.");
        if (!result) return;

        setShowPopup(prev => !prev);

    }

    function deleteUser() {

    }

    return (
        <div className="p-6">
            <button onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1.5 rounded-lg font-semibold">
                Delete Account
            </button>
            <Popup isOpen={showPopup} label="Enter Your Password" placeholder=" " onClose={() => setShowPopup(false)}
                   onSubmit={onSubmit}/>
            {Confirmation}
        </div>
    );
}

export default SettingsPage;