import {getApiKey} from "../services/userService.js";
import MainLoader from "../components/Loader/MainLoader.jsx";
import {useQuery} from '@tanstack/react-query';

function Dashboard() {
    const {data, isPending, error} = useQuery({
        queryKey: ["apiKey"],
        queryFn: getApiKey,
        retry: false
    });


    if (isPending) {
        return <MainLoader/>;
    }

    return (
        <div className="h-full px-1 md:px-6 pt-8 text-white relative">

        </div>
    );
}

export default Dashboard;