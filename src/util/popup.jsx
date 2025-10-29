import {showPopup} from "../components/Popup/PopupComponent.jsx";
import {LogOut} from "lucide-react";

async function confirmReactivate() {
    return await showPopup(
        "Account Scheduled for Deletion",
        <>Your account is currently marked as deleted and will be permanently
            deleted on <span className="text-zinc-100">November 28, 2025</span>.
            <br/><br/>All your data will be lost after this date.
            Would you like to reactivate your account?</>,
        {
            btn2: "Reactivate"
        }
    );
}

async function confirmLogout() {
    return await showPopup(
        "Confirm Logout",
        <>
            Are you sure you want to log out?
            <br/><br/>
            You will need to sign in again to access your account.
        </>,
        {
            icon: <LogOut className="text-blue-400"/>,
            iconBg: "bg-blue-500/10",
            btn2: "Logout"
        }
    );
}

export {confirmReactivate, confirmLogout};