import router from "./routes/AppRoutes.jsx";
import {RouterProvider} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import "nprogress/nprogress.css";

function App() {
    return <>
        <Toaster position="bottom-left"/>
        <RouterProvider router={router}/>
    </>;
}

export default App;