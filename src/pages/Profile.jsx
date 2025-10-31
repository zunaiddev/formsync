import UpdatePasswordForm from "../components/Profile/UpdatePasswordForm.jsx";
import UpdateEmailForm from "../components/Profile/UpdateEmailForm.jsx";
import UserProfile from "../components/Profile/UserProdile.jsx";
import DeleteAccount from "../components/Profile/DeleteAccount.jsx";

function Profile() {
    return (
        <div className="py-6 px-8 space-y-10">
            <UserProfile/>
            <UpdatePasswordForm/>
            <UpdateEmailForm/>
            <DeleteAccount/>
        </div>
    );
}

export default Profile;