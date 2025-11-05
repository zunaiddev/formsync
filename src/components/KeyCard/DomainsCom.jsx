import PropTypes from "prop-types";
import {useMutation} from "@tanstack/react-query";
import {deleteDomain} from "../../services/userService.js";
import {useState} from "react";
import Button from "../Button/Button.jsx";
import {X} from "lucide-react";

function DomainsCom({domains, removeDomain}) {
    const [deleting, setDeleting] = useState();

    const {mutate} = useMutation({
        mutationFn: deleteDomain,
        onSuccess: (_, id) => {
            console.log("Successfully deleted domain", id);
            setDeleting(null);
            removeDomain(id);
        },
        onError: () => {
            setDeleting(undefined);
        }
    });

    if (domains.length === 0) {
        return (<p className="text-[var(--text-secondary)] italic">
            No domains added yet.</p>);
    }

    function handleDelete(id) {
        setDeleting(id);
        mutate(id);
    }

    return (
        <div className="flex flex-wrap gap-2 max-w-4xl">
            {domains.map((domain) => (
                <Domain domain={domain} key={domain.id} deleting={deleting === domain.id}
                        handleDelete={() => handleDelete(domain.id)}/>
            ))}
        </div>
    );
}

function Domain({domain, deleting, handleDelete}) {
    return (
        <div className="flex items-center gap-2 bg-gray-700 text-white px-3 py-1 rounded-full text-sm shadow-sm">
            <span>{domain.domain}</span>
            <Button icon={X} onClick={handleDelete} isSubmitting={deleting}
                    className="hover:text-red-400 h-fit w-fit p-0 bg-transparent hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed">

            </Button>
        </div>
    )
}

DomainsCom.propTypes = {
    domains: PropTypes.array.isRequired,
}

export default DomainsCom;