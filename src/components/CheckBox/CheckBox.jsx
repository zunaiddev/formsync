import PropTypes from "prop-types";

function Checkbox({text, onChange}) {
    return (
        <div className="flex items-center">
            <input id="default-checkbox" type="checkbox" value="" onChange={onChange}
                   className="w-4 h-4 text-blue-600 rounded-sm bg-gray-700 border-gray-600 cursor-pointer"/>
            {text &&
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default
                    {text}</label>}
        </div>
    );
}

Checkbox.propTypes = {
    text: PropTypes.string,
}

export default Checkbox;