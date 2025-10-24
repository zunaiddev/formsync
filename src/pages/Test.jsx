import toast from "react-hot-toast";
import KeyCard from "../components/KeyCard/KeyCard.jsx";

function Test() {
    function handleOnClick() {
        toast("Hello World!");
    }

    return <div className="h-screen w-full bg-gray-200 flex justify-center items-center">
        <KeyCard
            apiKey="api key"
            role="User"
            requests={10}
            domains={["localhost"]}
            regenerate={() => {
            }}
            addDomain={() => {
            }}
            remove={() => {
            }}/>
    </div>
}

export default Test;