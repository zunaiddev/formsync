import Sidebar from "../components/Sidebar/Sidebar.jsx";
import {Menu} from "lucide-react";
import {useState} from "react";

function DashboardLayout() {
    const [show, setShow] = useState(window.innerWidth > 768);
    let isDesktop = window.innerWidth > 768;

    return <main className="h-screen relative">
        <Sidebar show={show} onClose={() => setShow(false)}/>
        <div className={`relative w-full  ${isDesktop ? "ml-44" : "pt-6 bg-green-950"}`}>
            {/*<Outlet/>*/}
        </div>
        <Menu
            className={`absolute w-7 h-7 left-1 top-1 text-white cursor-pointer ${show ? "hidden" : "visible"}`}
            onClick={() => setShow(true)}/>
    </main>;
}

export default DashboardLayout;