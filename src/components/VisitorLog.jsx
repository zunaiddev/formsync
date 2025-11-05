import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import Api from "../api.js";

function VisitorLog() {
    const visitMutation = useMutation({
        mutationFn: async () => {
            let response = await Api.post("/visitor");
            return response.data;
        },
        onSuccess: () => {
            console.log("Success!");
            sessionStorage.setItem("visitLogged", "true");
        },
        onError: () => {
            console.log("Could not fetch API");
        },
        retry: false,
    });

    useEffect(() => {
        if (!sessionStorage.getItem("visitLogged")) {
            visitMutation.mutate();
        }
    }, []);

    return null;
}

export default VisitorLog;