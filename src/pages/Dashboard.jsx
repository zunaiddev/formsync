import {generateApiKey, getApiKey} from "../services/userService.js";
import MainLoader from "../components/Loader/MainLoader.jsx";
import {useMutation, useQuery} from '@tanstack/react-query';
import SomethingWentWrong from "../components/SomethingWentWrong.jsx";
import {useEffect, useState} from "react";
import Button from "../components/Button/Button.jsx";
import KeyCard from "../components/KeyCard/KeyCard.jsx";
import toast from "react-hot-toast";

function Dashboard() {
    const [apiKey, setApiKey] = useState(undefined);

    const {data, isPending, isError, refetch} = useQuery({
        queryKey: ["apiKey"],
        queryFn: getApiKey,
    });

    const {mutate, isPending: generating} = useMutation({
        mutationFn: generateApiKey,
        onSuccess: data => {
            toast.success("Successfully generated api key!");
            setApiKey(data?.data);
        }
    });

    useEffect(() => {
        setApiKey(data?.data);
    }, [data]);

    useEffect(() => {
        console.log("Api Key", apiKey);
    }, [apiKey]);

    if (isPending) {
        return <MainLoader/>;
    }

    if (isError) {
        return <SomethingWentWrong retry={refetch}/>
    }

    return (
        <div className="h-full px-1 md:px-6 pt-8 text-white relative">
            {apiKey
                ? <KeyCard apikey={apiKey}/>
                : <Button className="w-fit" isSubmitting={generating} onClick={mutate}>
                    Generate Apikey
                </Button>}
        </div>
    );
}

export default Dashboard;