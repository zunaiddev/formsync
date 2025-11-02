import {useQuery} from "@tanstack/react-query";
import {getForms} from "../services/userService.js";
import {useEffect, useState} from "react";
import FormsHeader from "../components/Forms/FormsHeader.jsx";
import Form from "../components/Forms/Form.jsx";

function Forms() {
    const [formsToDelete, setFormsToDelete] = useState(new Set());

    const {data, isPending} = useQuery({
        queryKey: ["forms"],
        queryFn: getForms
    });

    useEffect(() => {
        console.log("forms top delete", formsToDelete);
    }, [formsToDelete]);

    function add(id) {
        setFormsToDelete(new Set([...formsToDelete, id]));
    }

    function remove(id) {
        setFormsToDelete(prev => {
            let newSet = new Set([...prev]);
            newSet.delete(id);
            return newSet;
        })
    }

    function selectAll() {

    }


    if (isPending) {
        return <p>Loading..</p>;
    }

    return <div className="px-5">
        <FormsHeader onSelectAll={selectAll}/>

        {data.map((item, index) => (
            <Form key={index} form={item} idx={index} addForm={add} removeForm={remove}/>
        ))}
    </div>;
}

export default Forms;