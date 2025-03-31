import toast from "react-hot-toast";
import PropTypes from "prop-types";
import {DocumentDuplicateIcon} from "@heroicons/react/16/solid/index.js";
import {useEffect} from "react";

function DashboardPage({isKey = false, apiKey = "1234-1234-1234-1234-1234", reqLeft = 0, domains = []}) {

    let keyInfo = {};

    useEffect(() => {
        (async () => {

        })();
    }, [])

    return (
        <div className="h-full  sm:p-3 md:p-6 text-white">
            <div className="shadow-lg rounded-2xl p-6 w-fit bg-[var(--bg-secondary)]">
                {isKey ? <>
                    <h2 className="text-xl font-semibold mb-4">API Key Details</h2>
                    <div className="mb-4">
                        <p className="font-medium">API Key:</p>
                        <div className="flex items-center">
                            <span className="text-[var(--text-secondary)] truncate">{apiKey}</span>
                            <button className="ml-2 text-blue-500 hover:text-blue-600 cursor-pointer"
                                    onClick={() => copyToClipboard("text")}>
                                <DocumentDuplicateIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="font-medium">Requests Left:</p>
                        <span className="text-[var(--text-secondary)]">{reqLeft} requests</span>
                    </div>
                    <div className="mb-4">
                        <p className="font-medium">Status:</p>
                        <span className="text-green-500 font-semibold">
                        Active
                    </span>
                    </div>
                    <div className="mb-4">
                        <p className="font-medium">Registered Domains:</p>
                        <ul className="list-disc pl-5 text-[var(--text-secondary)]">
                            {domains.map((domain) => (<li key={domain}>{domain}</li>))}
                        </ul>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer text-nowrap">Regenerate
                            Key
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer text-nowrap">Add
                            Domain
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer text-nowrap">Deactivate
                            Key
                        </button>
                    </div>
                </> : <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer text-nowrap">Generate
                    Key
                </button>}
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
    isKey: PropTypes.bool.isRequired,
    apiKey: PropTypes.string,
    reqLeft: PropTypes.number,
    domains: PropTypes.arrayOf(PropTypes.string),
}
export default DashboardPage;