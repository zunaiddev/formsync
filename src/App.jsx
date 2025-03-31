import router from "./routes/AppRoutes.jsx";
import {RouterProvider} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Loader from "./components/Loader/Loader.jsx";

function App() {
    return <>
        <Toaster/>
        <RouterProvider router={router}>
            <Loader/>
        </RouterProvider>
    </>;
}

export default App;