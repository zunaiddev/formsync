import PropTypes from "prop-types";
import MenuItem from "./MenuItem.jsx";
import {CardSim, LayoutDashboard, LogOut, User} from "lucide-react";

function Sidebar({show, onClose}) {
    let isMobile = window.innerWidth <= 768;

    return (
        <div className="w-full max-w-54 h-full border-r-1">
            <div className="pt-4 px-2 space-y-4">
                <MenuItem to="" text="Dashboard" icon={<LayoutDashboard className="size-5"/>}/>
                <MenuItem to="" text="Forms" icon={<CardSim className="size-5"/>}/>
                <MenuItem to="" text="Profile" icon={<User className="size-5"/>}/>
                <MenuItem to="" text="Logout" icon={<LogOut className="size-5 transform translate-y-full"/>}/>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Sidebar;