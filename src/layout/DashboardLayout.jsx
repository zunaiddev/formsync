import Sidebar from "../components/Sidebar/Sidebar.jsx";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {userInfo} from "../services/userService.js";

function DashboardLayout() {
    const [response, setResponse] = useState({});

    useEffect(() => {
        (async () => {
            setResponse(await userInfo("info"));
        })()
    }, []);

    return <main className="relative pl-50 sm:pt-20">
        <Sidebar name={response.data?.name} email={response.data?.email}/>
        <Outlet/>
    </main>;
}

export default DashboardLayout;