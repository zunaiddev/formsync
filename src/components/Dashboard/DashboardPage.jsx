import style from './dashboard.module.css';
import Form from '../Form/Form.jsx';
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {userInfo} from "../../services/userService.js";


function DashboardPage() {
    const [info, setInfo] = useState(null);
    const [forms, setForms] = useState([]);

    useEffect(() => {
        (async () => {
            const infoResponse = await userInfo("info");
            const formsResponse = await userInfo("forms");

            if (infoResponse.success || formsResponse.success) {
                setInfo(infoResponse.data);
                setForms(formsResponse.data);
            } else {
                toast.error(infoResponse.error);
            }
        })();
    }, []);


    if (!info) {
        return <div>
            <h1 className={style.wrongMessage}>Loading......</h1>
        </div>;
    }

    console.log(info);
    console.log(forms);

    let updatedForms = forms.map((form) => {
        return <Form key={form.id} name={form.name} email={form.email} subject={form.subject}
                     message={form.message} date={form.submittedAt}/>;
    })

    return (
        <div className={style.container}>
            <div className={style.keyContainer}>
                <button onClick={copyToClipboard}>
                    {info.apikey.key || "Not available"}
                </button>
            </div>

            <div className={style.forms}>
                {updatedForms}
            </div>
        </div>
    );
}

function copyToClipboard(e) {
    let text = e.target.textContent;
    navigator.clipboard.writeText(text)
        .then(() => toast.success("Copied!"))
        .catch((err) => toast.error("Failed to copy:" + err));
}

export default DashboardPage;