import {showPopup} from "../components/Popup/PopupComponent.jsx";
import {LogOut, RotateCcwKeyIcon} from "lucide-react";
import InputField from "../components/Inputs/InputsField.jsx";

async function confirmReactivate() {
    return await showPopup(
        "Account Scheduled for Deletion",
        <p className="text-sm text-zinc-500">Your account is currently marked as deleted and will be permanently
            deleted on <span className="text-zinc-100">November 28, 2025</span>.
            <br/><br/>All your data will be lost after this date.
            Would you like to reactivate your account?</p>,
        {
            btn2: "Reactivate"
        }
    );
}

async function confirmLogout() {
    return await showPopup(
        "Confirm Logout",
        <p className="text-sm text-zinc-500">
            Are you sure you want to log out?
            <br/><br/>
            You will need to sign in again to access your account.
        </p>,
        {
            icon: <LogOut className="text-blue-400"/>,
            iconBg: "bg-blue-500/10",
            btn2: "Logout"
        }
    );
}

async function confirmRegenerateApiKey() {
    return await showPopup(
        "Regenerate API Key?",
        <p className="text-sm text-zinc-500">
            Regenerating your API key will{" "}
            <span className="text-red-400 font-medium">
        immediately invalidate your current key
      </span>.
            <br/><br/>
            Any applications or services currently using the old key will stop working
            until you update them with the new key.
            <br/><br/>
            Do you want to continue?
        </p>,
        {
            icon: <RotateCcwKeyIcon className="text-yellow-400"/>,
            iconBg: "bg-yellow-500/10",
            btn2: "Regenerate Key"
        }
    );
}

async function confirmDeactivateApiKey() {
    return await showPopup(
        "Deactivate API Key?",
        <p className="text-sm text-zinc-500">
            Deactivating your API key will{" "}
            <span className="text-red-400 font-medium">immediately stop all services</span>{" "}
            that depend on it. <br/><br/>
            You can activate the key again anytime, but until then, your requests will
            not work. <br/><br/>
            Do you still want to continue?
        </p>,
        {
            btn2: "Deactivate"
        }
    );
}

async function confirmAddDomain(onSubmit) {
    return await showPopup(
        "Add Custom Domain",
        <form className="w-full px-2">
            <InputField label="Enter Domain" placeholder="formsync.netlify.app"/>
        </form>,
        {
            btn2: "Add Domain",
        }
    );
}


export {
    confirmReactivate, confirmLogout, confirmRegenerateApiKey,
    confirmDeactivateApiKey, confirmAddDomain
};