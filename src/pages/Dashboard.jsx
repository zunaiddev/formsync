import toast from "react-hot-toast";
import PropTypes from "prop-types";
import {addDomain, fetchData, generateKey, regenerateKey} from "../services/userService.js";
import {getToken} from "../services/tokenService.js";
import {HttpStatusCode} from "axios";
import {useEffect, useState} from "react";
import useConfirm from "../hooks/useConfirm.jsx";
import MainLoader from "../components/Loader/MainLoader.jsx";
import Popup from "../components/Popup/Popup.jsx";
import KeyCard from "../components/KeyCard/KeyCard.jsx";

function Dashboard() {
    const [{domains, key, requests, role, active}, setKeyInfo] = useState({domains: []});
    const [isKey, setKey] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [confirm, Confirmation] = useConfirm();

    useEffect(() => {
        (async () => {
            const token = await getToken();
            if (!token) {
                return;
            }

            let response = await fetchData("key", token);
            setLoading(false);
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
        const result = await confirm(undefined, undefined, <div
                className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p>
                    Regenerating your API key will <span className="font-semibold text-red-600 dark:text-red-400">immediately deactivate your current key</span>.
                    Any connected applications, services, or scripts using the current key will
                    <span className="font-semibold text-red-600 dark:text-red-400">&nbsp;stop functioning</span>.
                </p>
                <p>
                    To avoid disruptions, please ensure you
                    <span
                        className="font-semibold text-blue-600 dark:text-blue-400">&nbsp;update your key wherever it is in use</span> after
                    regeneration.
                </p>
            </div>
        );
        if (!result) return;

        let response = await regenerateKey(await getToken());
        if (response) {
            setKeyInfo(response.data);
        }
    }

    function handleAddDomain() {
        setShowPopup(true);
    }

    async function generate(domain) {
        let response = await generateKey(domain, await getToken());
        if (response) {
            toast.success("Key generated successfully");
            setKey(true);
            setKeyInfo(response.data);
        }
    }

    async function add(domain) {
        let response = await addDomain(domain);
        if (response.success) {
            setKeyInfo(response.data);
            return;
        }

        if (response.status === HttpStatusCode.Conflict) {
            return;
        }

        toast.error("Something went wrong");
    }

    function remove(id) {
        setKeyInfo(prev => ({
            ...prev,
            domains: prev.domains.filter(domain => domain.id !== id)
        }));
    }

    if (loading) {
        return <MainLoader/>;
    }

    return (
        <div className="h-full px-1 md:px-6 pt-8 text-white relative">
            {isKey ? (
                <KeyCard apiKey={key} role={role} active={active} requests={requests} domains={domains}
                         regenerate={regenerate}
                         addDomain={handleAddDomain}
                         remove={remove}
                />
            ) : (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer text-nowrap"
                    onClick={handleAddDomain}
                >
                    Generate Key
                </button>
            )}

            <Popup
                onSubmit={isKey ? add : generate}
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                topLabel={isKey ? "Add Domain" : "Generate Key"}
                label="Enter Domain name"
                placeholder="www.example.com"
                btnText={isKey ? "Add" : "Generate"}
                name="domain"
                validation={{
                    required: "domain is required",
                    pattern: {value: /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,6}$/, message: "Invalid domain name"},
                    validate: (value) => {
                        return domains.filter(domain => domain.domain === value).length <= 0 ? true : "Domain Already Exists";
                    }
                }}
            />

            {Confirmation}
        </div>
    );
}

Dashboard.propTypes = {
    isKey: PropTypes.bool.isRequired,
    apiKey: PropTypes.string,
    reqLeft: PropTypes.number,
    domains: PropTypes.arrayOf(PropTypes.string),
};

export default Dashboard;