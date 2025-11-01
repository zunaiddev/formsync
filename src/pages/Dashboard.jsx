import {getApiKey} from "../services/userService.js";
import MainLoader from "../components/Loader/MainLoader.jsx";
import {useQuery} from '@tanstack/react-query';
import SomethingWentWrong from "../components/SomethingWentWrong.jsx";
import KeyCard from "../components/KeyCard/KeyCard.jsx";
import GenerateKey from "../components/Dashboard/GenerateKey.jsx";

function Dashboard() {
    const {data, isPending, isError, refetch} = useQuery({
        queryKey: ["api-key"],
        queryFn: getApiKey,
        select: data => data?.data
    });

    if (isPending) {
        return <MainLoader/>;
    }

    if (isError) {
        return <SomethingWentWrong retry={refetch}/>
    }

    return (
        <div className="h-full px-1 md:px-6 pt-8 text-white relative">
            {data
                ? <KeyCard apiKey={data}/>
                : <GenerateKey/>}
        </div>
    );
}

export default Dashboard;