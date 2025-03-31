import Sidebar from "../components/Sidebar/Sidebar.jsx";
import {Outlet} from "react-router-dom";
import {Bars3BottomLeftIcon} from "@heroicons/react/16/solid/index.js";
import {useState} from "react";

function DashboardLayout() {
    const [show, setShow] = useState(false);

    return <main className="flex min-h-[100vh] relative">
        <Sidebar show={show}/>
        <div className="relative w-full">
            <Outlet/>
        </div>
        <Bars3BottomLeftIcon
            className="absolute inset-x-0 w-5 h-5 left-1 top-1 z-40 text-white cursor-pointer md:hidden"
            onClick={() => setShow(true)}/>
    </main>;
}

export default DashboardLayout;