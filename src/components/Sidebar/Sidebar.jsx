import PropTypes from "prop-types";
import {MenuItem, NavMenuItem} from "./Menus.jsx";
import DashboardIcon from "../Icon/DashboardIcon.jsx";
import InboxIcon from "../Icon/InboxIcon.jsx";
import ProfileIcon from "../Icon/ProfileIcon.jsx";
import LogoutIcon from "../Icon/LogoutIcon.jsx";
import {useMutation} from "@tanstack/react-query";
import {logout} from "../../services/authService.js";
import toast from "react-hot-toast";
import {confirmLogout} from "../../util/popup.jsx";
import {useNavigate} from "react-router-dom";


function Sidebar({show, onClose}) {
    let isMobile = window.innerWidth <= 768;
    const navigate = useNavigate();

    const {mutate} = useMutation({
        mutationFn: logout,
        onSuccess: _ => {
            localStorage.clear();
            navigate("/auth/login", {
                replace: true,
            });
            toast.success("Logged out");
        }
    });

    async function handleLogout() {
        if (await confirmLogout()) mutate();
    }

    return (
        <div className="fixed left-0 top-0 w-full p-4 max-w-44 h-full border-r-1 text-white">
            <div className="mb-2 p-4">
                <h5
                    className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900">
                    Form
                    Sync</h5>
            </div>
            <div className="">
                <NavMenuItem to="dashboard" text="Dashboard" icon={<DashboardIcon/>}/>
                <NavMenuItem to="forms" text="Forms" icon={<InboxIcon/>}/>
                <NavMenuItem to="profile" text="Profile" icon={<ProfileIcon/>}/>
                <MenuItem text="Logout"
                          icon={<LogoutIcon/>} onClick={handleLogout}/>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Sidebar;