import toast from "react-hot-toast";
import copyIcon from "../../assets/copy.png"
import PropTypes from "prop-types";
import {useLoaderData} from "react-router-dom";

function DashboardPage() {
    let response = useLoaderData();
    console.log(response)

    return (
        <div className="flex flex-col gap-2 w-fit border-1 rounded-lg px-4 py-5 text-white">
            <div
                className="flex items-center gap-1 w-full border rounded-md px-2 py-2">
                <span>{response?.data?.keyInfo?.key || "null"}</span>
                <button onClick={() => copyToClipboard(response?.data?.keyInfo?.key)} className="bg-none border-none">
                    <img src={copyIcon} alt="copy" className="size-5 cursor-pointer"/>
                </button>
            </div>
            <div className="flex items-center min-w-50 gap-6 w-full border rounded-md px-2 py-2">
                <span>Requests Left - </span>
                <span>{response?.data?.keyInfo?.requestsLeft || "none"}</span>
            </div>
            <div className={`flex items-center min-w-50 gap-2 w-full rounded-md px-2
             py-2 ${response?.data?.keyInfo?.isActive ? "bg-green-500" : "bg-red-500"}`}>
                <span>Status</span>
                <p>{response?.data?.keyInfo?.isActive ? "Active" : "Locked"}</p>
            </div>
        </div>
    );
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => toast.success("Copied!"))
        .catch((err) => toast.error("Failed to copy:" + err));
}


DashboardPage.propTypes = {
    apiKey: PropTypes.string.isRequired,
    reqLeft: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
}
export default DashboardPage;