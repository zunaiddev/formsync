import toast from "react-hot-toast";
import ResetPasswordForm from "../components/Forms/ResetPasswordForm.jsx";

function Test() {
    function handleOnClick() {
        toast("Hello World!");
    }

    return <ResetPasswordForm/>;
}

export default Test;