import {useEffect, useState} from "react";
import {fetchData} from "../../services/userService.js";
import {getToken} from "../../services/authService.js";
import Spinner from "../Loader/Spinner.jsx";

function ProfilePage() {
    const [{name, email, role, createdAt}, setInfo] = useState({});
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        (async () => {
            setLoading(true);
            let response = await fetchData("info", await getToken());
            setLoading(false);
            if (response.success) {
                setInfo(response.data);
            }
            setError(!response.success);
        })();

    }, []);

    if (loading) {
        return <Spinner/>;
    }

    if (error) {
        return <div className="h-full w-full flex items-center justify-center text-white">
            <h1 className="text-3xl font-bold">Something Went Wrong.</h1>
        </div>;
    }

    return (
        <div className="min-h-screen px-6 md:px-18 py-12 bg-[#0d1b2a] text-white">
            <div className="max-w-4xl ">
                <h1 className="text-3xl font-bold mb-8 text-white/90">User Information</h1>

                <div className="flex flex-col md:flex-row items-start gap-10">

                    <div
                        className="w-32 h-32 rounded-full bg-white/10 border border-white/20 text-white text-5xl font-semibold flex items-center justify-center shadow-lg">
                        {name.substring(0, 1)}
                    </div>


                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="text-sm text-gray-400">Name</p>
                            <p className="text-xl font-medium">{name}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400">Email</p>
                            <p className="text-xl font-medium">{email}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400">Role</p>
                            <span
                                className="inline-block bg-blue-800/40 text-blue-300 text-sm font-semibold px-3 py-1 rounded">
              {role}
            </span>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400">Account Created</p>
                            <p className="text-xl font-medium">{createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;