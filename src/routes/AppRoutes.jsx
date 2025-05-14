import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import Home from "../components/Home/HomePage.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import AuthLayout from "../layout/AuthLayout.jsx";
import AuthRedirect from "../Auth/AuthRedirect.jsx";
import ProtectedRoute from "../Auth/ProtectedRedirect.jsx";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

const PublicLayout = lazyWithProgress("../layout/PublicLayout.jsx");
const Docs = lazyWithProgress("../pages/Docs.jsx");
const Contact = lazyWithProgress("../pages/Contact.jsx");
const Login = lazyWithProgress("../pages/Login.jsx");
const Signup = lazyWithProgress("../pages/Signup.jsx");
const VerifyEmail = lazyWithProgress("../pages/VerifyEmail.jsx");
const Verify = lazyWithProgress("../pages/Verify.jsx");
const ForgetPassword = lazyWithProgress("../pages/ForgetPassword.jsx");
const ResetPassword = lazyWithProgress("../pages/ResetPassword.jsx");
const Dashboard = lazyWithProgress("../pages/Dashboard.jsx");
const Forms = lazyWithProgress("../pages/Forms.jsx");
const Profile = lazyWithProgress("../pages/Profile.jsx");
const Settings = lazyWithProgress("../pages/Settings.jsx");
const NotFound = lazyWithProgress("../pages/NotFound.jsx");

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense>
                <PublicLayout/>
            </Suspense>
        ),
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "/docs",
                element: (
                    <Suspense>
                        <Docs/>
                    </Suspense>
                ),
            },
            {
                path: "/contact",
                element: (
                    <Suspense>
                        <Contact/>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/auth",
        element: (
            <AuthRedirect>
                <AuthLayout/>
            </AuthRedirect>
        ),
        children: [
            {
                path: "/auth/login",
                element: (
                    <Suspense>
                        <Login/>
                    </Suspense>
                ),
            },
            {
                path: "/auth/signup",
                element: (
                    <Suspense>
                        <Signup/>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/verify",
        element: (
            <Suspense>
                <Verify/>
            </Suspense>
        ),
    },
    {
        path: "/forget-password",
        element: (
            <Suspense>
                <ForgetPassword/>
            </Suspense>
        ),
    },
    {
        path: "/reset-password",
        element: (
            <Suspense>
                <ResetPassword/>
            </Suspense>
        ),
    },
    {
        path: "/verify-email",
        element: (
            <Suspense>
                <VerifyEmail/>
            </Suspense>
        ),
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <DashboardLayout/>
            </ProtectedRoute>
        ),
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
            },
        ],
    },
    {
        path: "*",
        element: <NotFound/>,
    },
]);

function lazyWithProgress(path) {
    return lazy(async () => {
        Nprogress.start();
        let module = await import(path);
        Nprogress.done();
        return module;
    })
}

export default router;
