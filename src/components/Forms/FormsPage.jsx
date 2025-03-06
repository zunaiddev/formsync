import Form from "../Form/Form.jsx";
import {useLoaderData} from "react-router-dom";
import {deleteForm} from "../../services/userService.js";
import {useEffect, useState} from "react";

function FormsPage() {
    let [forms, setForms] = useState([]);
    let response = useLoaderData();

    useEffect(() => {
        setForms(response.data);
    }, [])

    return <div className="flex flex-wrap items-center gap-3">
        {forms.map(item => (<Form key={item.id} name={item.name}
                                  subject={item.subject} email={item.email} date={item.createdAt}
                                  message={item.message} onDelete={() => {
            deleteForm(item.id).then(r => {
                forms.splice(forms.indexOf(r), 1);
            })
        }}/>))}
    </div>;
}

export default FormsPage;