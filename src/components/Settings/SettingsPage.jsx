import useConfirm from "../../hooks/useConfirm.jsx";
import Popup from "../Popup/Popup.jsx";
import {useState} from "react";
import toast from "react-hot-toast";
import {deleteUser} from "../../services/userService.js";
import {getToken} from "../../services/jwtService.js";
import {HttpStatusCode} from "axios";

function SettingsPage() {
    const [confirm, Confirmation] = useConfirm();
    const [showPopup, setShowPopup] = useState(false);

    async function handleDelete() {
        const result = await confirm(undefined, undefined, alertComponent(), "Delete My Account");

        if (!result) return;

        setShowPopup(true);
    }

    async function handleDeleteUser(data) {
        let password = data.password;

        if (!password.match(/^(?!.*\\\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,20}$/)) {
            toast.error("Invalid Password");
            return true;
        }

        let status = await deleteUser(await getToken(), data);

        if (status === HttpStatusCode.Ok) {
            toast.success("Account Deleted");
            localStorage.clear();
            location.reload();
        } else if (status === HttpStatusCode.Unauthorized) {
            toast.error("Invalid Password");
        } else {
            toast.error("Something Went Wrong");
        }
    }

    return (
        <div className="p-6">
            <button onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1.5 rounded-lg font-semibold">
                Delete Account
            </button>
            <Popup name="password" topLabel="Delete Your Account" label="Enter Your Password"
                   isOpen={showPopup} validation={{
                required: "Password is required"
            }}
                   onClose={() => setShowPopup(false)}
                   onSubmit={handleDeleteUser}/>
            {Confirmation}
        </div>
    );
}

function alertComponent() {
    return <div
        className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        <p>
            Deleting your account is a <span
            className="font-semibold text-red-600 dark:text-red-400">permanent action</span> and
            cannot be undone.
            Once you confirm, your account will be <span className="font-semibold text-red-600 dark:text-red-400">immediately and permanently deleted</span>.
        </p>

        <div>
            <p>This includes the removal of:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>All your personal account information</li>
                <li>Your <span className="font-medium text-blue-600 dark:text-blue-400">API key</span> (which will
                    stop working instantly)
                </li>
                <li>All submitted <span
                    className="font-medium text-blue-600 dark:text-blue-400">forms and data</span></li>
            </ul>
        </div>

        <p>
            After deletion, <span className="font-semibold text-red-600 dark:text-red-400">you will not be able to recover your account or any of its data</span>.
            Please make sure to back up anything important before proceeding.
        </p>

        <p className="font-medium text-red-700 dark:text-red-500">
            If you're sure, click "Delete My Account" to continue.
        </p>
    </div>
}

export default SettingsPage;