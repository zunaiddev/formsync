import Button from "../Button/Button.jsx";
import PropTypes from "prop-types";
import Checkbox from "../CheckBox/CheckBox.jsx";
import RefreshIcon from "../Icon/RefreshIcon.jsx";
import {TrashIcon} from "@heroicons/react/16/solid/index.js";

function FormsHeader({checked, onSelectAll, showDelete, deleteOne, deleting, onRefresh, refreshing}) {
    return (
        <header className="flex justify-between w-full  text-white p-3 min-h-14">
            <div className="flex gap-4">
                <Checkbox text="Select All" onChange={onSelectAll} checked={checked}/>
                <Button icon={RefreshIcon} onClick={onRefresh} isSubmitting={refreshing} className="!w-fit"/>

                {showDelete &&
                    <Button icon={TrashIcon} isSubmitting={deleting}
                            className="bg-red-500 hover:bg-red-600 !px-4 !w-fit"
                            onClick={deleteOne}/>
                }
            </div>
        </header>
    );
}

FormsHeader.protoTypes = {
    onSelectAll: PropTypes.func.isRequired,
    showDelete: PropTypes.bool.isRequired,
    deleteOne: PropTypes.func.isRequired,
}

export default FormsHeader;