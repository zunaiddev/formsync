import deleteIcon from '../../assets/delete.svg';
import {useEffect, useState} from "react";
import {fetchData} from "../../services/userService.js";
import Spinner from "../Loader/Spinner.jsx";
import {getToken} from "../../services/authService.js";

function FormsPage() {
    let [forms, setForms] = useState([{}]);
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            let response = await fetchData("forms", await getToken());
            setForms(response.data);

            setLoading(false);
            setErrors(!response.success);
        })();
    }, []);

    if (loading) {
        return <Spinner/>;
    }

    if (errors) {
        return <h1>Something Went Wrong</h1>;
    }

    if (!forms.length) {
        return <h1 className="text-xl font-bold font-(family-name:--open-sans) text-white m-5">Could Not Found Any
            Form</h1>
    }

    return <div className="flex items-center gap-4 flex-col sm:p-2 md:p-4 ">
        {forms.map((form) => (
            <div key={form.id} className="flex flex-wrap items-center bg-[#1b263b] w-full h-12 rounded-lg relative">
                <div className="h-full w-5  rounded-l-lg flex items-center justify-center text-white border-r-2 mr-1">
                    <span>1</span>
                </div>
                <h1 className="md:text-lg sm:text-sm text-white font-bold sm:mr-2 md:mr-6 lg:mr-9">{forms.name}</h1>
                <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9">{forms.email}</span>
                <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9">{forms.subject}</span>
                <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9">{forms.date}</span>
                <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9 truncate md:max-w-50 sm:max-w-25">
               {forms.message}
                 </span>
                <span
                    className="text-sm sm:mr-3 md:mr-6 lg:mr-9 cursor-pointer text-blue-500 hover:underline">View</span>
                <button className="flex justify-center items-center cursor-pointer justify-self-stretch-end
                                absolute right-0 bg-red-700 h-full rounded-r-lg px-2">
                    <img src={deleteIcon} className="size-5" alt="deleteIcon"/>
                </button>
            </div>))}
    </div>;
}

export default FormsPage;