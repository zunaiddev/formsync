import Button from "../Button/Button.jsx";
import PropTypes from "prop-types";
import {LucideRefreshCw, Trash} from "lucide-react";
import {showDeleteAllFormsPopup} from "../Popup/Popups.jsx";

function FormsHeader({refetch, removeAll}) {

    async function handleOnClick() {
        if (await showDeleteAllFormsPopup()) {
            removeAll();
        }
    }

    return (
        <header className="flex gap-3 w-full text-white p-3 min-h-14 ">
            <Button icon={LucideRefreshCw} onClick={refetch} className="justify-self-end">
                Refresh
            </Button>
            <Button icon={Trash} onClick={handleOnClick}
                    className="bg-red-500 hover:bg-red-600 w-fit">
                Delete All
            </Button>
        </header>
    );
}

FormsHeader.protoTypes = {
    onSelectAll: PropTypes.func.isRequired,
    showDelete: PropTypes.bool.isRequired,
    deleteOne: PropTypes.func.isRequired,
}

export default FormsHeader;