import {bool} from "prop-types";

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

export default FormView;