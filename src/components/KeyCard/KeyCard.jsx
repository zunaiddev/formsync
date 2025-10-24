import PropTypes from "prop-types";
import copyToClipboard from "../../util/copyToClipboard.js";
import {getToken} from "../../services/tokenService.js";
import {HttpStatusCode} from "axios";
import toast from "react-hot-toast";
import {deleteDomain} from "../../services/userService.js";
import {useState} from "react";
import {Copy} from "lucide-react";

function KeyCard({apiKey, role, active, requests, domains, regenerate, addDomain, remove}) {
    const [deleting, setDeleting] = useState(null);

    async function handleDeleteDomain(id) {
        setDeleting(id);
        let status = await deleteDomain(id, await getToken());
        setDeleting(null);

        if (status === HttpStatusCode.NoContent) {
            remove(id);
            toast.success("Deleted");
        } else {
            toast.error("Something Went Wrong!");
        }
    }

    return (
        <div
            className={`shadow-lg rounded-2xl p-6 w-fit bg-[var(--bg-secondary)] relative mx-auto sm:mx-0 ${role === "ULTIMATE" ? "border-2 border-yellow-400" : role === "ADMIN" && "border-2 border-blue-400"}`}>

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
                <p className="font-medium">API Key:</p>
                <div className="flex items-center overflow-x-auto w-60 sm:w-fit">
                <span className="text-[var(--text-secondary)]">
                  {apiKey}
                </span>
                    <button
                        className="ml-2 text-blue-500 hover:text-blue-600 cursor-pointer"
                        onClick={() => copyToClipboard(apiKey)}
                    >
                        <Copy className="h-5 w-5"/>
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
                {domains?.length === 0 ? (
                    <p className="text-[var(--text-secondary)] italic">No domains added yet.</p>
                ) : (
                    <div className="flex flex-wrap gap-2 max-w-4xl">
                        {domains.map((domain) => (
                            <div
                                key={domain.id}
                                className="flex items-center gap-2 bg-gray-700 text-white px-3 py-1 rounded-full text-sm shadow-sm"
                            >
                                <span>{domain.domain}</span>
                                <button
                                    className="hover:text-red-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
                                    onClick={() => handleDeleteDomain(domain.id)}
                                    title="Delete Domain"
                                    disabled={deleting === domain.id}
                                >
                                    {deleting === domain.id ? (
                                        <Spinner className="size-4 px-0.5"/>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    )}

                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3 flex-wrap md:flex-row">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer text-nowrap"
                    onClick={regenerate}
                >
                    Regenerate Key
                </button>
                <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer text-nowrap"
                    onClick={addDomain}
                >
                    Add Domain
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer text-nowrap">
                    Deactivate Key
                </button>
            </div>
        </div>
    );
}

KeyCard.propTypes = {
    apiKey: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    requests: PropTypes.number.isRequired,
    domains: PropTypes.array.isRequired,
    regenerate: PropTypes.func.isRequired,
    addDomain: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
}

export default KeyCard;