import PropTypes from "prop-types";
import {NavMenuItem} from "./Menus.jsx";
import DashboardIcon from "../Icon/DashboardIcon.jsx";
import InboxIcon from "../Icon/InboxIcon.jsx";
import ProfileIcon from "../Icon/ProfileIcon.jsx";
import LogoutComponent from "./LogoutComponent.jsx";


function Sidebar({show, close}) {
    let isMobile = window.innerWidth <= 768;

    function handleClose() {
        console.log("close");
        if (isMobile) {
            console.log("Close Called")
            close();
        }
    }

    return (
        <div className={`flex z-50 fixed left-0 top-0 w-screen transform duration-500
        max-w-44 h-full text-white ${show ? "-translate-x-0" : "-translate-x-full"} 
        ${isMobile ? "max-w-none " : "border-r-1"}`}>
            <div className="p-4 bg-gray-800 w-full">
                <div className="mb-2 p-4">
                    <h5
                        className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900">
                        Form
                        Sync</h5>
                </div>
                <div className="">
                    <NavMenuItem to="dashboard" text="Dashboard" icon={<DashboardIcon/>} onClick={handleClose}/>
                    <NavMenuItem to="forms" text="Forms" icon={<InboxIcon/>} onClick={handleClose}/>
                    <NavMenuItem to="profile" text="Profile" icon={<ProfileIcon/>} onClick={handleClose}/>
                    <LogoutComponent/>
                </div>
            </div>

            {isMobile && <div className="h-full w-full" onClick={close}/>}
        </div>
    );
}

Sidebar.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
}

export default Sidebar;