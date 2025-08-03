import PropTypes from "prop-types";

function Select({label, values, register, error}) {
    return (
        <div className=" w-full">
            <small>{label}</small>
            <select {...register}
                    className={`w-full h-8 border rounded-sm bg-gray-800 cursor-pointer text-sm ${error && "border-red-600"}`}
                    defaultValue="">
                <option value="" disabled hidden>Select...</option>
                {values.map(value => (
                    <option className="cursor-pointer rounded-md" key={value} value={value}>{value}</option>
                ))}
            </select>
            {error && <small className="text-red-600">{error.message}</small>}
        </div>
    );
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    register: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default Select;
