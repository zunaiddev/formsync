import deleteIcon from "../../assets/delete.svg";
import {useEffect, useState} from "react";
import {deleteForm, fetchData} from "../../services/userService.js";
import Spinner from "../Loader/Spinner.jsx";
import {getToken} from "../../services/authService.js";
import {bool} from "prop-types";
import toast from "react-hot-toast";

function FormsPage() {
    const [forms, setForms] = useState([]);
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedForm, setSelectedForm] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        (async () => {
            let response = await fetchData("forms", await getToken());
            setForms(response.data);
            setLoading(false);
            setErrors(!response.success);
        })();
    }, []);

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

    if (!forms && !forms.length) {
        return (
            <h1 className="text-xl font-bold font-(family-name:--open-sans) text-white m-5">
                Could Not Found Any Form
            </h1>
        );
    }

    return (
        <div className="flex items-center gap-4 flex-col sm:p-2 md:p-4 relative min-h-screen">
            {forms.map((form, idx) => <Form key={idx} form={form} idx={idx} view={() => viewForm(form)}/>)}
            <FormView show={showForm} form={selectedForm} onClose={() => setShowForm(false)}/>
        </div>
    );
}


function Form({form, idx, view}) {

    async function handleDeleteForm(form) {
        let response = await deleteForm(form.id, await getToken());

        if (response.success) {
            toast.success("deleted");
            return;
        }

        toast.error("Something went wrong");
    }

    return <div
        key={form.id}
        className="flex gap-2 items-center bg-[#1b263b] w-full h-12 rounded-lg relative">
        <div
            className="h-full w-5  rounded-l-lg flex items-center justify-center text-white border-r-2 mr-1">
            <span>{idx + 1}.</span>
        </div>
        <h1 className="md:text-lg sm:text-sm text-white font-bold sm:mr-2 md:mr-6 lg:mr-9">
            {form.name}
        </h1>
        <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9 hidden md:block">
            {form.email}
          </span>
        <span className="text-sm text-white truncate hidden lg:block">
            {form.subject}
          </span>
        <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9 hidden lg:block truncate">
            {form.submittedAt}
          </span>
        <span className="text-sm text-white truncate max-w-45 hidden md:block">
            {form.message}
          </span>
        <span className="text-sm cursor-pointer text-blue-500 hover:underline"
              onClick={view}> View </span>
        <button
            className="flex justify-center items-center cursor-pointer justify-self-stretch-end
                                absolute right-0 bg-red-700 h-full rounded-r-lg px-2">
            <img src={deleteIcon} className="size-5" alt="deleteIcon" onClick={() => handleDeleteForm(form)}/>
        </button>
    </div>
}

function FormView({show, form, onClose}) {
    if (!show || !form) {
        return null;
    }

    return <div
        className="flex items-center justify-center text-white h-full w-full absolute top-0 right-0 backdrop-blur-sm"
        onClick={onClose}>
        <div className="border flex flex-col gap-4 p-3 max-w-3xs rounded-lg bg-cyan-900"
             onClick={(e) => e.stopPropagation()}>
            <h1 className="text-lg font-bold">Name: {form.name}</h1>
            <span className="text-md">Email: {form.email}</span>
            <span className="text-md">Subject: {form.subject}</span>
            <div className="flex flex-col gap-2">
                <span className="text-md">Message: </span>
                <span className="text-sm">{form.message}</span>
            </div>
            <span className="text-sm">Submitted At: {form.submittedAt}</span>
        </div>
    </div>;
}

FormView.propTypes = {
    show: bool.isRequired,
    form: Object.isRequired,
}

export default FormsPage;
