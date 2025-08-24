import {useEffect, useState} from "react";
import {deleteForm, fetchData} from "../../services/userService.js";
import {getToken} from "../../services/tokenService.js";
import Form from "./Form.jsx";
import FormsHeader from "./FormsHeader.jsx";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";
import FormView from "./FormView.jsx";
import MainLoader from "../Loader/MainLoader.jsx";
import RefreshIcon from "../Icon/RefreshIcon.jsx";
import Button from "../Button/Button.jsx";

function FormsPage() {
    const [forms, setForms] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formsToDelete, setFormsToDelete] = useState([]);
    const [confirm, Confirmation] = useConfirm();
    const [viewData, setViewData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        (async () => {
            await loadForms();
        })();
    }, []);

    async function loadForms() {
        let response = await fetchData("forms", await getToken());
        setForms(response.data);
        setLoading(false);
        setError(!response.success);

        return response;
    }

    function addFormsToDelete(id) {
        setFormsToDelete([...formsToDelete, id]);
    }

    function removeFormToDelete(id) {
        setFormsToDelete(formsToDelete.filter(form => form !== id));
    }

    function removeForm(id) {
        setForms(forms.filter(form => form.id !== id));
    }

    async function deleteForms() {
        const result = await confirm(`Are you sure you want to delete ${formsToDelete.length === forms.length ? "All" : ""} forms?`);

        if (!result) {
            return;
        }

        setIsDeleting(true);
        let response = await deleteForm(formsToDelete, await getToken());
        setIsDeleting(false);

        if (response.success) {
            setForms(forms.filter(form => !formsToDelete.includes(form.id)));
            setFormsToDelete([]);

            toast.success("deleted");
        } else {
            toast.error("Something went wrong");
        }
    }

    async function handleRefresh() {
        setRefreshing(true);
        let response = await loadForms();
        setRefreshing(false);

        if (response.success) {
            setFormsToDelete([]);

            if (response.data.length) {
                toast.success("Refreshed");
            } else {
                toast.error("No Forms Found!");
            }

            return;
        }

        toast.error("Could Not Refresh");
    }

    function handleSelectAll() {
        if (formsToDelete.length === forms.length) {
            setFormsToDelete([]);
            return;
        }

        setFormsToDelete(forms.map((form) => form.id));
    }

    if (loading) {
        return <MainLoader/>;
    }

    if (error) {
        return <h1>Something Went Wrong</h1>;
    }

    if (!forms.length) {
        return (<div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold font-(family-name:--open-sans) text-white m-5">
                    Could Not Found Any Forms
                </h1>
                <Button icon={RefreshIcon} text="Refresh" onClick={handleRefresh} isSubmitting={refreshing}
                        className="!w-fit"/>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4 flex-col sm:p-2 md:p-4 relative min-h-screen">
            <FormsHeader onSelectAll={handleSelectAll} showDelete={formsToDelete.length > 0}
                         deleteOne={deleteForms} checked={formsToDelete.length === forms.length}
                         deleting={isDeleting} onRefresh={handleRefresh} refreshing={refreshing}/>
            {forms.map((form, idx) => <Form key={form.id} form={form} idx={idx} addForm={addFormsToDelete}
                                            removeForm={removeFormToDelete} setViewData={setViewData}
                                            checked={formsToDelete.includes(form.id)}/>)}
            {viewData && <FormView data={viewData} onClose={() => setViewData(null)} removeForm={removeForm}/>}

            {Confirmation}
        </div>
    );
}

export default FormsPage;
