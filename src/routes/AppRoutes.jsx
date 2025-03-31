import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home.jsx";
import PublicLayout from "../layout/PublicLayout.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import Docs from "../pages/Docs.jsx";
import Contact from "../pages/Contact.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Forms from "../pages/Forms.jsx";
import Settings from "../pages/Settings.jsx";
import AuthLayout from "../layout/AuthLayout.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import AuthRedirect from "../Auth/AuthRedirect.jsx";
import ProtectedRoute from "../Auth/ProtectedRedirect.jsx";
import Profile from "../pages/Profile.jsx";
import Verify from "../pages/Verify.jsx";
import ForgetPassword from "../pages/ForgetPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import NotFound from "../pages/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "/docs",
                element: <Docs/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthRedirect><AuthLayout/></AuthRedirect>,
        children: [
            {
                path: "/auth/login",
                element: <Login/>,
            },
            {
                path: "/auth/signup",
                element: <Signup/>,
            }
        ]
    },
    {
        path: "/verify",
        element: <Verify/>
    }, {
        path: "/forget-password",
        element: <ForgetPassword/>
    }, {
        path: "/reset-password",
        element: <ResetPassword/>
    },
    {
        path: "/",
        element: <ProtectedRoute><DashboardLayout/></ProtectedRoute>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard/>,
            },
            {
                path: "/forms",
                element: <Forms/>,
            },
            {
                path: "/settings",
                element: <Settings/>,
            },
            {
                path: "/profile",
                element: <Profile/>,
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>,
    }
]);

export default router;