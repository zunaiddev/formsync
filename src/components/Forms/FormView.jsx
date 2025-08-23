import Button from "../Button/Button.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {deleteForm} from "../../services/userService.js";
import {getToken} from "../../services/tokenService.js";
import useConfirm from "../../hooks/useConfirm.jsx";
import toast from "react-hot-toast";

function FormView({data, onClose, removeForm}) {
    const [deleting, setDeleting] = useState(false);
    const [confirm, Confirmation] = useConfirm();

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    async function handleDelete() {
        setDeleting(true);
        let response = await deleteForm([data.id], await getToken());
        setDeleting(false);

        if (response.success) {
            removeForm(data.id);
            onClose();
            toast.success("Message successfully deleted!");
        } else {
            toast.error("Something went wrong");
        }
    }

    return (
        <div
            className="backdrop-blur-sm  fixed top-0 right-0 w-full h-screen flex justify-center items-center"
            onClick={onClose}>
            <div
                className="relative border-2 border-gray-500 py-2 px-6 rounded-md bg-gray-800 space-y-4 max-w-70"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-50">Name</span>
                    <span className="text-gray-300 text-sm">{data.name}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-50">Email</span>
                    <span className="text-gray-300 text-sm">{data.email}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-50">Subject</span>
                    <span className="text-gray-300 text-sm">{data.message}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-50">Message</span>
                    <span className="text-gray-300 text-sm">{data.message}</span>
                </div>

                <div className="absolute top-0 right-0 text-gray-400 flex flex-col pr-2 pt-2">
                    <small>{data.submittedAt.substring(0, 10)}</small>
                    <small>{data.submittedAt.substring(11)}</small>
                </div>

                <Button className="bg-red-500 border-white outline-0 hover:bg-red-600" text="Delete"
                        isSubmitting={deleting} onClick={handleDelete}/>
            </div>
            {Confirmation}
        </div>
    );
}

FormView.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    removeForm: PropTypes.func.isRequired,
}

export default FormView;