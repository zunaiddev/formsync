import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import PublicLayout from "../layout/PublicLayout.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import AuthLayout from "../layout/AuthLayout.jsx";
import AuthRedirect from "../Auth/AuthRedirect.jsx";
import ProtectedRoute from "../Auth/ProtectedRedirect.jsx";
import Loader from "../components/Loader/Loader.jsx";


const Home = lazy(() => import("../pages/Home.jsx"));
const Docs = lazy(() => import("../pages/Docs.jsx"));
const Contact = lazy(() => import("../pages/Contact.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Signup = lazy(() => import("../pages/Signup.jsx"));
const Verify = lazy(() => import("../pages/Verify.jsx"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword.jsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword.jsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const Forms = lazy(() => import("../pages/Forms.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));
const Settings = lazy(() => import("../pages/Settings.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout/>,
        children: [
            {
                path: "",
                element: <Suspense fallback={<Loader/>}>
                    <Home/>,
                </Suspense>
            },
            {
                path: "/docs",
                element: <Suspense fallback={<Loader/>}>
                    <Docs/>,
                </Suspense>
            },
            {
                path: "/contact",
                element: <Suspense fallback={<Loader/>}>
                    <Contact/>,
                </Suspense>
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthRedirect><AuthLayout/></AuthRedirect>,
        children: [
            {
                path: "/auth/login",
                element: <Suspense fallback={<Loader/>}>
                    <Login/>
                </Suspense>,
            },
            {
                path: "/auth/signup",
                element: <Suspense fallback={<Loader/>}>
                    <Signup/>
                </Suspense>,
            }
        ]
    },
    {
        path: "/verify",
        element: <Suspense fallback={<Loader/>}><Verify/></Suspense>
    }, {
        path: "/forget-password",
        element: <Suspense fallback={<Loader/>}><ForgetPassword/></Suspense>
    }, {
        path: "/reset-password",
        element: <Suspense fallback={<Loader/>}><ResetPassword/></Suspense>
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