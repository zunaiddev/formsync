import {getApiKey} from "../services/userService.js";
import {useQuery} from '@tanstack/react-query';
import SomethingWentWrong from "../components/SomethingWentWrong.jsx";
import KeyCard from "../components/KeyCard/KeyCard.jsx";
import GenerateKey from "../components/Dashboard/GenerateKey.jsx";
import KeyCardSkeleton from "../components/Skaletons/KeyCardSkeleton.jsx";

function Dashboard() {
    const {data, isPending, isError, refetch} = useQuery({
        queryKey: ["api-key"],
        queryFn: getApiKey,
    });

    if (isPending) {
        return <div className="h-full px-1 md:px-6 pt-8 text-white relative">
            <KeyCardSkeleton/>
        </div>;
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