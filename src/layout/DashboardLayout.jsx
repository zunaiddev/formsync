import Sidebar from "../components/Sidebar/Sidebar.jsx";
import {Menu} from "lucide-react";
import {useState} from "react";
import {Outlet} from "react-router-dom";

function DashboardLayout() {
    let isDesktop = window.innerWidth > 768;
    const [show, setShow] = useState(isDesktop);

    return <main className="relative">
        <Sidebar show={show} close={() => setShow(false)}/>
        <div className={`h-screen max-h-screen relative ${isDesktop ? "ml-44" : "pt-6"}`}>
            <Outlet/>
        </div>
        {!show && <button onClick={() => setShow(true)}>
            <Menu className="fixed top-3 left-2 text-white"/>
        </button>}
    </main>;
}

export default DashboardLayout;