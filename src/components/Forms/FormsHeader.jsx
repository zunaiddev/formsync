import Button from "../Button/Button.jsx";
import PropTypes from "prop-types";

function FormsHeader({deleteAll, showDelete, deleteOne}) {
    return (
        <header className="flex justify-between w-full  text-white p-3">
            <div className="flex gap-4">
                {showDelete && <div className="w-20">
                    <Button text="Delete" onClick={deleteOne}/>
                </div>}

                <div className="w-20">
                    <Button text="Delete All" onClick={deleteAll}/>
                </div>
            </div>
        </header>
    );
}

FormsHeader.protoTypes = {
    showDelete: PropTypes.bool.isRequired,
    deleteAll: PropTypes.func,
    deleteOne: PropTypes.func.isRequired,
}

export default FormsHeader;