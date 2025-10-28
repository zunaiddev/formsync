import toast from "react-hot-toast";
import SomethingWentWrong from "../components/SomethingWentWrong.jsx";

function Test() {
    function handleOnClick() {
        toast("Hello World!");
    }

    return <SomethingWentWrong/>;
}

export default Test;