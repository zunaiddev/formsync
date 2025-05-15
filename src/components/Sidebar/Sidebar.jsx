import PropTypes from "prop-types";
import {Card, Chip, List, ListItem, ListItemPrefix, ListItemSuffix, Typography,} from "@material-tailwind/react";
import {
    ArrowLeftEndOnRectangleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PresentationChartBarIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import {NavLink} from "react-router-dom";
import {logout} from "../../services/userService.js";

function Sidebar({show, onClose}) {
    let isMobile = window.innerWidth <= 768;

    return (
        <div className={`flex items-center h-screen bg-[var(bg-secondary)] border-r-1 fixed left-0
         top-0 z-10 text-white transition duration-75 ${show ? "translate-x-0 w-screen" : "translate-x-[-100%]"}`}>
            <Card
                className="h-full w-full max-w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5 text-white bg-[var(--primary)]">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        Form Sync
                    </Typography>
                </div>
                <List className="gap-1">
                    <NavLink to="/dashboard">
                        {({isActive}) => (
                            <ListItem
                                className={`gap-2 cursor-pointer hover:bg-[var(--bg-secondary)] ${isActive && "bg-blue-600 hover:bg-blue-600"}`}>
                                <ListItemPrefix>
                                    <PresentationChartBarIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Dashboard
                            </ListItem>
                        )}
                    </NavLink>

                    <NavLink to="forms">
                        {({isActive}) => (
                            <ListItem
                                className={`gap-2 cursor-pointer hover:bg-[var(--bg-secondary)] ${isActive && "bg-blue-600 hover:bg-blue-600"}`}>
                                <ListItemPrefix>
                                    <InboxIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Forms
                                <ListItemSuffix>
                                    <Chip value="14" size="sm" variant="ghost" color="blue-gray"
                                          className="rounded-full"/>
                                </ListItemSuffix>
                            </ListItem>
                        )}
                    </NavLink>

                    <NavLink to="profile">
                        {({isActive}) => (
                            <ListItem
                                className={`gap-2 cursor-pointer hover:bg-[var(--bg-secondary)] ${isActive && "bg-blue-600 hover:bg-blue-600"}`}>
                                <ListItemPrefix>
                                    <UserCircleIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Profile
                            </ListItem>
                        )}
                    </NavLink>

                    <NavLink to="/settings">
                        {({isActive}) => (
                            <ListItem
                                className={`gap-2 cursor-pointer hover:bg-[var(--bg-secondary)] ${isActive && "bg-blue-600 hover:bg-blue-600"}`}>
                                <ListItemPrefix>
                                    <Cog6ToothIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Settings
                            </ListItem>
                        )}
                    </NavLink>

                    <ListItem className="gap-2 cursor-pointer" onClick={logout}>
                        <ListItemPrefix>
                            <ArrowLeftEndOnRectangleIcon className="h-5 w-5 font-bold"/>
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>

            {isMobile && <div className="w-full h-full bg-transparent" onClick={onClose}/>}
        </div>
    )
}

Sidebar.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Sidebar;