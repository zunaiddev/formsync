import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";

function RootLayout() {

    return (
        <main>
            <Toaster toastOptions={{
                duration: 2500,
                error: {
                    style: {
                        border: '1px solid red',
                        background: '#f0d5d6',
                        width: '100%',
                    },
                },
            }}/>
            <Outlet/>
        </main>
    );
}

export default RootLayout;