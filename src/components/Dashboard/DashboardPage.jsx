import toast from "react-hot-toast";
import PropTypes from "prop-types";
import {DocumentDuplicateIcon} from "@heroicons/react/16/solid/index.js";
import {useEffect, useState} from "react";
import {fetchData, generateKey, regenerateKey} from "../../services/userService.js";
import {getToken} from "../../services/authService.js";
import Popup from "../Popup/Popup.jsx";

function DashboardPage() {
    const [{domains, key, requests}, setKeyInfo] = useState({domains: []});
    const [isKey, setKey] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        (async () => {
            let response = await fetchData("key", await getToken());

            if (!response.success) {
                toast.error("Something went wrong");
                return;
            }

            if (response.data == null) {
                setKey(false);
                return;
            }

            setKey(true);
            setKeyInfo(response.data);
        })();
    }, []);

    async function regenerate() {
        let response = await regenerateKey(await getToken());
        if (response) {
            setKeyInfo(response.data);
        }
    }

    async function generate(domain) {
        let response = await generateKey(domain, await getToken());
        if (response) {
            toast.success("Key generated successfully");
            setKeyInfo(response.data);
            console.log(response.data);
        }
    }

    return (
        <div className="h-full  sm:p-3 md:p-6 text-white">
            <div className="shadow-lg rounded-2xl p-6 w-fit bg-[var(--bg-secondary)]">
                {isKey ? <>
                    <h2 className="text-xl font-semibold mb-4">API Key Details</h2>
                    <div className="mb-4">
                        <p className="font-medium">API Key:</p>
                        <div className="flex items-center">
                            <span className="text-[var(--text-secondary)] truncate">{key}</span>
                            <button className="ml-2 text-blue-500 hover:text-blue-600 cursor-pointer"
                                    onClick={() => copyToClipboard(key)}>
                                <DocumentDuplicateIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="font-medium">Requests Left:</p>
                        <span className="text-[var(--text-secondary)]">{10 - requests} requests</span>
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
                            {domains !== undefined && domains.map((domain) => (<li key={domain}>{domain}</li>))}
                        </ul>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer text-nowrap"
                            onClick={regenerate}>Regenerate Key
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer text-nowrap"
                    onClick={() => setShowPopup(true)}>Generate Key
                </button>}
            </div>

            <Popup onSubmit={generate} isOpen={showPopup}/>
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