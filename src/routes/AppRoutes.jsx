import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import RootLayout from "../layout/RootLayout.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import NotFound from "../pages/NotFound.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </>
    )
);

export default router;