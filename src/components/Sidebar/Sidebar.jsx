import user from "../../assets/user.svg";
import dashboardIcon from "../../assets/dashboard.svg";
import settingsIcon from "../../assets/setting.svg";
import formsIcon from "../../assets/form.svg";
import logoutIcon from "../../assets/logout.svg";
import logo from "../../assets/logo.png";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

function Sidebar({name = undefined, email = "example@example.com"}) {
    return (
        <div
            className="h-[100vh] flex flex-col items-center gap-8
            py-[3%] px-5 fixed left-0 top-0  text-white">
            <div className="flex justify-center items-center">
                <img src={logo} alt="logo" className="size-6"/>
                <h4>Formsync</h4>
            </div>
            <div className="w-full  flex flex-col items-center gap-5">
                <NavLink to="/settings" className="flex flex-col justify-center items-center gap-2">
                    <img src={user} alt="profile" className="size-7"/>
                    <span className="text-sm">{email}</span>
                    <h1>{name}</h1>
                </NavLink>
                <div className="flex flex-col justify-normal
                items-start gap-3  font-bold">
                    <NavLink to="/dashboard"
                             className={({isActive}) =>
                                 `w-full flex items-center gap-2 px-2 py-1 rounded-md hover:bg-blue-400 ${isActive ? "bg-blue-600" : ""}`
                             }>
                        <img src={dashboardIcon} alt="profile" className="size-7 "/>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/forms"
                             className={({isActive}) =>
                                 `w-full flex items-center gap-2 px-2 py-1 rounded-md hover:bg-blue-400 ${isActive ? "bg-blue-600" : ""}`
                             }>
                        <img src={formsIcon} alt="profile" className="size-7 "/>
                        <span>Forms</span>
                    </NavLink>
                    <NavLink to="/settings"
                             className={({isActive}) =>
                                 `w-full flex items-center gap-2 px-2 py-1 rounded-md hover:bg-blue-400 ${isActive ? "bg-blue-600" : ""}`
                             }>
                        <img src={settingsIcon} alt="profile" className="size-7 "/>
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>
            <button
                className="flex justify-center items-center gap-1 absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer">
                <img src={logoutIcon} alt="logout" className="size-7"/>
                logout
            </button>
        </div>
    );
}

Sidebar.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}

export default Sidebar;