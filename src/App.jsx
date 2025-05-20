import router from "./routes/AppRoutes.jsx";
import {RouterProvider} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import "nprogress/nprogress.css";

function App() {


    const handleClick = async () => {
        console.log("clicked")
        const result = await confirm("Are you sure you want to continue?");
        if (result) {
            alert("User confirmed!");
            // perform operation here
        } else {
            alert("User cancelled!");
        }
    };

    return <>
        <Toaster/>
        <RouterProvider router={router}/>
    </>;
}

export default App;