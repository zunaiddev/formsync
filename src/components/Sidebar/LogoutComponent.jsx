import {MenuItem} from "./Menus.jsx";
import LogoutIcon from "../Icon/LogoutIcon.jsx";
import {confirmLogout} from "../Popup/Popups.jsx";
import {logout} from "../../services/authService.js";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

function LogoutComponent() {
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
        <MenuItem text="Logout"
                  icon={<LogoutIcon/>} onClick={handleLogout}/>
    );
}

export default LogoutComponent;