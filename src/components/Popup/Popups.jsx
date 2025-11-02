import {showPopup} from "./PopupComponent.jsx";
import {CalendarCheck, Earth, Lock, LogOut, Mail, MailOpen, MailWarning, RotateCcwKeyIcon} from "lucide-react";
import InputField from "../Inputs/InputsField.jsx";
import formatDate from "../../util/formatDate.js";

async function confirmReactivate(date) {
    return await showPopup(
        "Account Scheduled for Deletion",
        <p className="text-sm text-zinc-500">
            Your account is currently marked as deleted and will be permanently
            deleted on {" "}
            <span className="text-zinc-100">{formatDate(new Date(date))}</span>.
            <br/><br/>All your data will be lost after this date.
            Would you like to reactivate your account?</p>,

        {
            btn2: {show: true, text: "Reactivate"},
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
            icon: {
                icon: <LogOut className="text-red-500"/>,
                className: "bg-red-500/20"
            },
            btn2: {
                show: true,
                text: "Logout",
                className: "bg-red-600 hover:bg-red-500",
            },
            closeOnBgClick: true
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
            icon: {
                icon: <RotateCcwKeyIcon className="text-yellow-400"/>
            },
            btn2: {
                show: true,
                text: "Regenerate",
            },
            closeOnBgClick: true
        }
    );
}

async function confirmDeactivateApiKey() {
    return await showPopup(
        "Deactivate API Key",
        <p className="text-sm text-zinc-500">
            Deactivating your API key will{" "}
            <span className="text-red-400 font-medium">immediately stop all services</span>{" "}
            that depend on it. <br/><br/>
            You can activate the key again anytime, but until then, your requests will
            not work.
        </p>,
        {
            icon: {
                icon: <Lock className="text-red-500"/>,
                className: "bg-red-500/20"
            },
            btn2: {
                show: true,
                text: "Deactivate",
                className: "bg-red-600 hover:bg-red-500",
            }
        }
    );
}

async function confirmAddDomain(ref, error, setError) {

    const result = await showPopup(
        "Add Custom Domain",
        <InputField
            label="Enter Domain"
            placeholder="formsync.netlify.app"
            className="bg-blue-200/10"
            ref={ref}
        />
        ,
        {
            icon: {
                icon: <Earth className="text-blue-500"/>,
                className: "bg-blue-500/20"
            },
            btn2: {
                show: true,
                text: "Add",
            },
        }
    );

    return ref.current.value ?? null;
}

async function showAccountLockedPopup() {
    return await showPopup(
        "Account Locked",
        <p className="text-sm text-zinc-500">
            Your account has been temporarily locked due to security reasons. <br/><br/>
            Please try again later or contact support if you believe this is a mistake.
        </p>,
        {
            icon: {
                icon: <Lock className="text-red-500"/>,
                className: "bg-red-500/20"
            },
            btn1: {
                show: false
            },
            btn2: {
                show: true,
                text: "Ok"
            }
        }
    );
}

async function showAccountNotVerifiedPopup() {
    return await showPopup(
        "Email Not Verified",
        <p className="text-sm text-zinc-500">
            Your account is currently <span className="text-yellow-500 font-medium">inactive</span> because your
            email address has not been verified. <br/><br/>
            You cannot resend the verification link, but you can sign up again to continue.
        </p>,
        {
            icon: {
                icon: <MailWarning className="text-yellow-500"/>,
                className: "bg-yellow-500/20"
            },
            btn1: {
                show: true,
                text: "Back"
            },
            btn2: {
                show: true,
                text: "Sign Up Again",
                className: "bg-yellow-600 hover:bg-yellow-500",
                onClick: () => {
                    window.location.href = "/signup";
                }
            }
        }
    );
}

async function showAccountDeletionInfo() {
    const date = new Date();
    date.setDate(date.getDate() + 3);

    const deletionDate = formatDate(date);

    return await showPopup(
        "Account Scheduled for Deletion",
        <div className="text-sm text-zinc-500 space-y-3 leading-relaxed">
            <p>
                Your account has been <span className="font-medium text-red-400">successfully marked for deletion</span>.
            </p>

            <p>
                It will be permanently deleted on{" "}
                <span className="font-semibold text-white">{deletionDate}</span>.
            </p>

            <p>
                If you wish to restore your account before this date, simply log in again and the deletion
                will be automatically cancelled.
            </p>

            <p className="text-red-400 font-medium">
                After the deletion date passes, your account cannot be recovered.
            </p>
        </div>,
        {
            icon: {
                icon: <CalendarCheck className="text-green-500"/>,
                className: "bg-green-500/20"
            },
            btn1: {
                show: true,
                text: "OK",
                className: "bg-zinc-700 hover:bg-zinc-600"
            },
            btn2: {show: false}
        }
    );
}

async function showEmailUpdateVerificationPopup(newEmail) {
    return await showPopup(
        "Verify Your New Email",
        <div className="text-sm text-zinc-500 space-y-3 leading-relaxed">
            <p>
                We have sent a verification link to:
            </p>

            <p className="font-medium text-white break-all">
                {newEmail}
            </p>

            <p>
                Please open the link to complete your email update request.
                Until the verification is completed, your current email will remain active.
            </p>
        </div>,
        {
            icon: {
                icon: <Mail className="text-blue-500"/>,
                className: "bg-blue-500/20"
            },
            btn1: {
                show: true,
                text: "OK",
                className: "bg-zinc-700 hover:bg-zinc-600"
            },
            btn2: {show: false}
        }
    );
}

async function showFormSubmissionDetailsPopup(form) {
    return await showPopup(
        "Form Submission Details",
        <div className="text-sm text-zinc-400 space-y-4 select-text">

            <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Name</p>
                <p className="text-white font-medium">{form.name}</p>
            </div>

            <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Email</p>
                <p className="text-white font-medium break-all">{form.email}</p>
            </div>

            <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Subject</p>
                <p className="text-white font-medium">{form.subject}</p>
            </div>

            <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Message</p>
                <p className="text-white font-medium">{form.message}</p>
            </div>

            <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Submitted At</p>
                <p className="text-white font-medium">{form.submittedAt}</p>
            </div>

        </div>,
        {
            icon: {
                icon: <MailOpen className="text-blue-400"/>,
                className: "bg-blue-500/20"
            },
            btn2: {
                show: true,
                text: "Delete",
                className: "bg-red-500 hover:bg-red-600"
            },
            closeOnBgClick: true
        }
    );
}

export {
    confirmReactivate, confirmLogout, confirmRegenerateApiKey,
    confirmDeactivateApiKey, confirmAddDomain, showAccountLockedPopup,
    showAccountNotVerifiedPopup, showAccountDeletionInfo,
    showEmailUpdateVerificationPopup, showFormSubmissionDetailsPopup
};