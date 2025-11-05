import router from "./routes/AppRoutes.jsx";
import {RouterProvider} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import "nprogress/nprogress.css";
import PopupComponent from "./components/Popup/PopupComponent.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import VisitorLog from "./components/VisitorLog.jsx";

const queryClient = new QueryClient();
queryClient.defaultQueryOptions({
    retry: false,
    refetchOnWindowFocus: false,
});

function App() {


    return <QueryClientProvider client={queryClient}>
        <Toaster/>
        <PopupComponent/>
        <RouterProvider router={router}/>
        <ReactQueryDevtools/>
        <VisitorLog/>
    </QueryClientProvider>;
}

export default App;