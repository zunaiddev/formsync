import router from "./routes/AppRoutes.jsx";
import {RouterProvider} from "react-router-dom";
import {Toaster} from "react-hot-toast";

function App() {
    return <>
        <Toaster/>
        <RouterProvider router={router}/>
    </>;
}

export default App;