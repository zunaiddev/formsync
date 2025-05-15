import Sidebar from "../components/Sidebar/Sidebar.jsx";
import {Outlet} from "react-router-dom";
import {Bars3BottomLeftIcon} from "@heroicons/react/16/solid/index.js";
import {useState} from "react";

function DashboardLayout() {
    const [show, setShow] = useState(window.innerWidth > 768);
    let isDesktop = window.innerWidth > 768;

    return <main className="flex min-h-[100vh] relative">
        <Sidebar show={show} onClose={() => setShow(false)}/>
        <div className={`relative w-full ${isDesktop && "ml-44"}`}>
            <Outlet/>
        </div>
        <Bars3BottomLeftIcon
            className={`absolute w-7 h-7 left-1 top-1 text-white cursor-pointer ${show ? "hidden" : "visible"}`}
            onClick={() => setShow(true)}/>
    </main>;
}

export default DashboardLayout;