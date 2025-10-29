import MainLoader from "../components/Loader/MainLoader.jsx";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "../services/userService.js";
import UpdatePasswordForm from "../components/Profile/UpdatePasswordForm.jsx";
import UpdateEmailForm from "../components/Profile/UpdateEmailForm.jsx";
import UserProdile from "../components/Profile/UserProdile.jsx";
import DeleteAccount from "../components/Profile/DeleteAccount.jsx";

function Profile() {
    const [{name, email, role, createdAt}, setInfo] = useState({
        name: "",
        email: "",
        role: "",
        createdAt: "",
    });

    const {data, isPending, isError} = useQuery({
        queryKey: ["user"],
        queryFn: getUser
    });

    useEffect(() => {
        if (data?.data) {
            setInfo(data.data);
        }
    }, [data]);

    if (isPending) {
        return <MainLoader/>;
    }

    if (isError) {
        return <div className="h-full w-full flex items-center justify-center text-white">
            <h1 className="text-3xl font-bold">Something Went Wrong.</h1>
        </div>;
    }

    return (
        <div className="py-6 px-8 space-y-10">
            <UserProdile user={data?.data}/>
            <UpdatePasswordForm/>
            <UpdateEmailForm/>
            <DeleteAccount/>
        </div>
    );
}

export default Profile;