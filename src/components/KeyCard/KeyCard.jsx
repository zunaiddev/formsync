import PropTypes from "prop-types";
import copyToClipboard from "../../util/copyToClipboard.js";
import {Copy} from "lucide-react";
import {useQueryClient} from "@tanstack/react-query";
import RegenerateKey from "../Dashboard/RegenerateKey.jsx";
import DeactivateKey from "../Dashboard/DeactivateKey.jsx";
import DomainsCom from "./DomainsCom.jsx";
import {useState} from "react";
import AddDomainPopup from "../Popup/AddDomainPopup.jsx";

function KeyCard({apiKey}) {
    const {key, role, requests, active} = apiKey;
    const [showPopup, setShowPopup] = useState(false);

    const client = useQueryClient();

    function setActive(newActive) {
        client.setQueryData(["api-key"], prev => {
            return {
                ...prev,
                active: newActive
            };
        });
    }

    function setKey(newKey) {
        client.setQueryData(["api-key"], prev => {
            return {
                ...prev,
                key: newKey
            };
        });
    }

    function setDomains(newDomains) {
        client.setQueryData(["api-key"], prev => ({
            ...prev,
            domains: [...newDomains]
        }));
    }

    function removeDomain(id) {
        client.setQueryData(["api-key"], prev => ({
            ...prev,
            domains: prev.domains.filter(domain => domain.id !== id),
        }))
    }

    return (
        <>
            <div
                className={`shadow-lg rounded-2xl p-6 w-full max-w-lg bg-[var(--bg-secondary)] relative mx-auto sm:mx-0 ${role === "ULTIMATE" ? "border-2 border-yellow-400" : role === "ADMIN" && "border-2 border-blue-400"}`}>

                {(role === "ULTIMATE" || role === "ADMIN") && (
                    <div
                        className={`absolute top-0 right-0 -mt-4 -mr-4 px-3 py-1 text-sm font-bold rounded-full text-white shadow-md
        ${role === "ULTIMATE" ? "bg-yellow-500" : "bg-blue-500"}
      `}
                    >
                        {role === "ULTIMATE" ? "👑 ULTIMATE" : "🛡 ADMIN"}
                    </div>
                )}

                <h2 className="text-xl font-semibold mb-4">API Key Details</h2>
                <div className="mb-4">
                    <p className="font-medium mb-1">API Key:</p>

                    <div
                        className="flex items-center gap-2 pr-3 py-2 rounded-md">
                        <div
                            className="overflow-x-auto whitespace-nowrap text-gray- scrollbar-thin scrollbar-thumb-zinc-700">
                            {key}
                        </div>

                        <button
                            className="text-blue-500 hover:text-blue-400 flex-shrink-0 cursor-pointer"
                            onClick={() => copyToClipboard(key)}
                        >
                            <Copy className="size-4"/>
                        </button>
                    </div>
                </div>

                {
                    role === "USER" && <div className="mb-4">
                        <p className="font-medium">Requests Left:</p>
                        <span className="text-[var(--text-secondary)]">
                {10 - requests} requests
              </span>
                    </div>
                }
                <div className="mb-4">
                    <p className="font-medium">Status:</p>
                    <span
                        className={`${active ? "text-green-500" : "text-red-500"} font-semibold`}>{active ? "Active" : "Locked"}</span>
                </div>

                <div className="mb-4">
                    <p className="font-medium mb-2">Registered Domains:</p>
                    <DomainsCom domains={apiKey.domains} removeDomain={removeDomain}/>
                </div>

                <div className="flex flex-col gap-3 flex-wrap md:gap-6 md:flex-row w-full">
                    <RegenerateKey setKey={setKey}/>
                    <button onClick={() => setShowPopup(true)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer text-nowrap"
                    >
                        Add Domain
                    </button>
                    <DeactivateKey active={active} setActive={setActive}/>
                </div>
            </div>
            {showPopup && <AddDomainPopup domains={apiKey.domains}
                                          setDomains={setDomains}
                                          hide={() => setShowPopup(false)}/>}
        </>
    );
}

KeyCard.propTypes = {
    apiKey: PropTypes.object.isRequired,
}

export default KeyCard;