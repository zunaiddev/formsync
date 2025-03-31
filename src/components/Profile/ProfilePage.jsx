import {PencilSquareIcon} from "@heroicons/react/16/solid/index.js";
import {useEffect, useState} from "react";
import {fetchData} from "../../services/userService.js";

function ProfilePage() {
    const [info, setInfo] = useState({
        name: undefined,
        email: undefined,
        password: "******",
        role: undefined,
    });
    const [error, setError] = useState(false);

    useEffect(() => {

        (async () => {
            let response = await fetchData("info");
            console.log(response.data["name"]);
            setInfo({...info, name: response.data["name"], email: response.data["email"], role: response.data.role});

            setError(!response.success);
        })();

    }, []);

    if (info === null) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Something Went Wrong.</h1>;
    }

    return (
        <div className="flex flex-col text-white border border-gray-600 rounded-lg w-fit py-6 m-6">
            <div className=" text-white border-transparent border-b border-b-gray-600 w-full px-3 pb-2">
                <h1 className="text-lg font-bold">Personal Info</h1>
            </div>
            <div className=" text-white border-b border-gray-600 flex gap-20 w-full px-8 py-2">
                <span className="text-md min-w-21">Name </span>
                <span className="text-md font-bold min-w-81">{info.name}</span>
                <PencilSquareIcon className="h-5 w-5 text-blue-700 cursor-pointer"/>
            </div>
            <div className=" text-white border-b border-gray-600 flex gap-20 w-full px-8 py-2">
                <span className="text-md min-w-21">Email </span>
                <span className="text-md font-bold min-w-81">{info.email}</span>
                <PencilSquareIcon className="h-5 w-5 text-blue-700 cursor-pointer"/>
            </div>
            <div className=" text-white border-b border-gray-600 flex gap-20 w-full px-8 py-2">
                <span className="text-md min-w-21">Password </span>
                <span className="text-md font-bold min-w-81 ">{info.password}</span>
                <PencilSquareIcon className="h-5 w-5 text-blue-700 cursor-pointer"/>
            </div>
            <div className="  text-white border-b border-gray-600 flex gap-20 w-full px-8 py-2">
                <span className="text-md min-w-21">Role </span>
                <span className="text-md font-bold min-w-81">{info.role}</span>
                <PencilSquareIcon className="h-5 w-5 text-blue-700 cursor-pointer"/>
            </div>
        </div>
    );
}

export default ProfilePage;