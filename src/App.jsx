import router from "./routes/AppRoutes.jsx";
import {RouterProvider} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import "nprogress/nprogress.css";
import PopupComponent from "./components/Popup/PopupComponent.jsx";

function App() {
    return <>
        <Toaster/>
        <PopupComponent/>
        <RouterProvider router={router}/>
    </>;
}

export default App;