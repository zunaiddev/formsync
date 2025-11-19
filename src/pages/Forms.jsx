import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteForms, getForms} from "../services/userService.js";
import FormsHeader from "../components/Forms/FormsHeader.jsx";
import Form from "../components/Forms/Form.jsx";
import toast from "react-hot-toast";
import Button from "../components/Button/Button.jsx";
import {LucideRefreshCw} from "lucide-react";
import SomethingWentWrong from "../components/SomethingWentWrong.jsx";
import FormHeaderSkeleton from "../components/Skaletons/FormHeaderSkaleton.jsx";
import FormSkeleton from "../components/Skaletons/FormSkeleton.jsx";

function Forms() {
    const client = useQueryClient();

    const {data, isPending, isError, refetch} = useQuery({
        queryKey: ["forms"],
        queryFn: getForms
    });

    const {mutate} = useMutation({
        mutationFn: deleteForms,
        onSuccess: (data, ids) => {
            if (ids.length === 1) {
                client.setQueryData(["forms"], prev => prev.filter(f => f.id !== ids[0]));
            } else {
                client.setQueryData(["forms"], []);
            }
            toast.success("Deleted");
        },
        onError: error => {
            if (error.response) toast.error("Could not delete form");
        },
        onSettled: (data, error, id) => {
            toast.remove(id[0]);
        }
    });

    function handleRemoveAll() {
        mutate(data.map(f => f.id));
    }

    function removeForm(id) {
        toast.loading("Deleting...", {
            id: id
        });
        mutate([id]);
    }

    if (isPending) {
        return <div className="px-5">
            <FormHeaderSkeleton/>
            <div className="space-y-3">
                <FormSkeleton/>
                <FormSkeleton/>
                <FormSkeleton/>
                <FormSkeleton/>
                <FormSkeleton/>
                <FormSkeleton/>
            </div>
        </div>;
    }

    if (isError) {
        return <SomethingWentWrong retry={refetch}/>
    }

    if (data.length === 0) {
        return <div className="flex justify-center gap-6 flex-col items-center h-full">
            <h1 className="text-white font-bold text-2xl">There are no forms yet.</h1>
            <Button icon={LucideRefreshCw} onClick={refetch} isSubmitting={isPending}>
                Refresh
            </Button>
        </div>
    }

    return <div className="px-5">
        <FormsHeader refetch={refetch} removeAll={handleRemoveAll}/>

        {data.map((item, index) => (
            <Form key={index} form={item} idx={index} removeForm={removeForm}/>
        ))}
    </div>;
}

export default Forms;