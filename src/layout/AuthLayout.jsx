import {Outlet} from "react-router-dom";

function AuthLayout() {
    return (
        <div className="h-screen w-full flex justify-center items-center px-4">
            <Outlet/>
        </div>
    );
}

export default AuthLayout;