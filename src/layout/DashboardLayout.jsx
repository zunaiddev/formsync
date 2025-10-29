import Sidebar from "../components/Sidebar/Sidebar.jsx";
import {Menu} from "lucide-react";
import {useState} from "react";
import {Outlet} from "react-router-dom";

function DashboardLayout() {
    let isDesktop = window.innerWidth > 768;
    const [show, setShow] = useState(isDesktop);

    return <main className="relative">
        <Sidebar show={show} onClose={() => setShow(false)}/>
        <div className={`h-screen max-h-screen relative ${isDesktop ? "ml-44" : "pt-6"}`}>
            <Outlet/>
        </div>
        <Menu
            className={`absolute w-7 h-7 left-1 top-1 text-white cursor-pointer ${show ? "hidden" : "visible"}`}
            onClick={() => setShow(true)}/>
    </main>;
}

export default DashboardLayout;