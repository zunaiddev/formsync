import UpdatePasswordForm from "../components/Profile/UpdatePasswordForm.jsx";
import DeleteAccount from "../components/Profile/DeleteAccount.jsx";
import {getUser} from "../services/userService.js";
import {useQuery} from "@tanstack/react-query";
import UserProfile from "../components/Profile/UserProfile.jsx";
import UpdateEmailForm from "../components/Profile/UpdateEmailForm.jsx";
import SomethingWentWrong from "../components/SomethingWentWrong.jsx";

function Profile() {
    const {data, isPending, isError, refetch} = useQuery({
        queryKey: ["users"],
        queryFn: getUser,
    });

    console.log(data);

    if (isError) {
        return <SomethingWentWrong retry={refetch}/>
    }

    return (
        <div className="py-6 px-3 md:px-8 space-y-10">
            <UserProfile user={data} isPending={isPending}/>
            <UpdatePasswordForm/>
            {!isPending && <UpdateEmailForm email={data.email}/>}
            <DeleteAccount/>
        </div>
    );
}

export default Profile;