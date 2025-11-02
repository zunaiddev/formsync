import Button from "../Button/Button.jsx";
import PropTypes from "prop-types";
import {LucideRefreshCw, Trash} from "lucide-react";
import Checkbox from "../CheckBox/CheckBox.jsx";

function FormsHeader({checked, onSelectAll, refetch, isPending}) {

    return (
        <header className="flex gap-3 w-full text-white p-3 min-h-14 ">
            <Checkbox text="Select All" onChange={onSelectAll} checked={checked}/>
            {checked &&
                <Button icon={Trash}
                        className="bg-red-500 hover:bg-red-600 !px-4 !w-fit"
                        onClick={deleteOne}/>
            }

            <Button icon={LucideRefreshCw} onClick={refetch} className="justify-self-end"/>
        </header>
    );
}

FormsHeader.protoTypes = {
    onSelectAll: PropTypes.func.isRequired,
    showDelete: PropTypes.bool.isRequired,
    deleteOne: PropTypes.func.isRequired,
}

export default FormsHeader;