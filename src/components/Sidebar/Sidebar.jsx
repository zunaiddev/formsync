import PropTypes from "prop-types";
import {Card, List, ListItem, ListItemPrefix, Typography,} from "@material-tailwind/react";
import {
    ArrowLeftEndOnRectangleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PresentationChartBarIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import {logout} from "../../services/userService.js";
import MenuItem from "./MenuItem.jsx";

function Sidebar({show, onClose}) {
    let isMobile = window.innerWidth <= 768;

    return (
        <div className={`flex items-center h-screen bg-[var(bg-secondary)] sm:border-r-1 fixed left-0
         top-0 z-10 text-white transition duration-75 ${show ? "translate-x-0" : "translate-x-[-100%]"} ${isMobile && show && "w-screen"}`}>
            <Card
                className="h-full w-full max-w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5 text-white bg-[var(--primary)]">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        Form Sync
                    </Typography>
                </div>
                <List className="gap-1">
                    <MenuItem to="/dashboard" icon={PresentationChartBarIcon} text="Dashboard"
                              onClick={isMobile && onClose}/>
                    <MenuItem to="/forms" icon={InboxIcon} text="Forms" onClick={isMobile && onClose}/>
                    <MenuItem to="/profile" icon={UserCircleIcon} text="Profile" onClick={isMobile && onClose}/>
                    <MenuItem to="/settings" icon={Cog6ToothIcon} text="Settings" onClick={isMobile && onClose}/>

                    <ListItem className="gap-2 cursor-pointer" onClick={logout}>
                        <ListItemPrefix>
                            <ArrowLeftEndOnRectangleIcon className="h-5 w-5 font-bold"/>
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>

            {show && isMobile && <div className="w-full h-full bg-none" onClick={onClose}/>}
        </div>
    )
}

Sidebar.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Sidebar;