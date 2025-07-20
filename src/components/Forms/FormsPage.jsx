import {useEffect, useState} from "react";
import {deleteForm, fetchData} from "../../services/userService.js";
import Spinner from "../Loader/Spinner.jsx";
import {getToken} from "../../services/tokenService.js";
import Form from "./Form.jsx";
import FormView from "./FormView.jsx";
import FormsHeader from "./FormsHeader.jsx";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";

function FormsPage() {
    const [forms, setForms] = useState([]);
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedForm, setSelectedForm] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formsToDelete, setFormsToDelete] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [confirm, Confirmation] = useConfirm();

    useEffect(() => {
        (async () => {
            let response = await fetchData("forms", await getToken());
            setForms(response.data);
            setLoading(false);
            setErrors(!response.success);
        })();
    }, []);

    useEffect(() => {
        if (formsToDelete.length) {
            setShowDelete(true);
        } else {
            setShowDelete(false);
        }
    }, [formsToDelete])

    function viewForm(form) {
        setSelectedForm(form);
        setShowForm(true)
    }

    if (loading) {
        return <Spinner/>;
    }

    if (errors) {
        return <h1>Something Went Wrong</h1>;
    }

    if (!forms.length) {
        return (
            <h1 className="text-xl font-bold font-(family-name:--open-sans) text-white m-5">
                Could Not Found Any Form
            </h1>
        );
    }

    function addForm(id) {
        setFormsToDelete([...formsToDelete, id]);
    }

    function removeForm(id) {
        setFormsToDelete(formsToDelete.filter(form => form !== id));
    }

    async function deleteForms() {
        const result = await confirm("Are you sure you want to delete forms?");

        if (!result) {
            return;
        }

        let id = toast.loading("Deleting Forms...");
        let token = await getToken();
        let response = await deleteForm(formsToDelete, token);
        toast.remove(id);
        if (response.success) {
            setForms(forms.filter(form => !formsToDelete.includes(form.id)));
            setFormsToDelete([]);
        } else {
            toast.error("Something went wrong");
        }
    }

    async function deleteAll() {
        console.log("delete all fun called")
        const result = await confirm("Are you sure you want to delete All forms?");

        if (!result) {
            return;
        }

        let id = toast.loading("Deleting Forms...");
        setFormsToDelete([]);
        let ids = forms.map(form => form.id);
        let token = await getToken();
        let response = await deleteForm(ids, token);
        toast.remove(id);
        if (response.success) {
            setForms([]);
        } else {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="flex items-center gap-4 flex-col sm:p-2 md:p-4 relative min-h-screen">
            <FormsHeader showDelete={showDelete} deleteOne={deleteForms} deleteAll={deleteAll}/>
            {forms.map((form, idx) => <Form key={form.id} form={form} idx={idx} addForm={addForm}
                                            removeForm={removeForm}/>)}
            <FormView show={showForm} form={selectedForm} onClose={() => setShowForm(false)}/>
            {Confirmation}
        </div>
    );
}

export default FormsPage;
