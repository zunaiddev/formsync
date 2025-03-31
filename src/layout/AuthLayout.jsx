import {Outlet} from "react-router-dom";
import loginImage from "../assets/login.jpg";

function AuthLayout() {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div
                className="w-[80%] max-w-[700px] max-h-[450px] flex items-center justify-center bg-[var(--bg-secondary)] rounded-lg overflow-hidden ">
                <img className="w-[40%] h-[100%] hidden sm:block" src={loginImage} alt="side image"/>
                <Outlet/>
            </div>
        </div>
    );
}

export default AuthLayout;