import {generateApiKey, getApiKey} from "../services/userService.js";
import MainLoader from "../components/Loader/MainLoader.jsx";
import {useMutation, useQuery} from '@tanstack/react-query';
import SomethingWentWrong from "../components/SomethingWentWrong.jsx";
import Button from "../components/Button/Button.jsx";
import KeyCard from "../components/KeyCard/KeyCard.jsx";
import toast from "react-hot-toast";

function Dashboard() {
    const {data, isPending, isError, refetch} = useQuery({
        queryKey: ["api-key"],
        queryFn: getApiKey,
        select: data => data?.data
    });

    console.log(data)

    const {mutate, isPending: generating} = useMutation({
        mutationFn: generateApiKey,
        onSuccess: data => {
            toast.success("Successfully generated api key!");
        }
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
                : <Button className="w-fit" isSubmitting={generating} onClick={mutate}>
                    Generate Apikey
                </Button>}
        </div>
    );
}

export default Dashboard;