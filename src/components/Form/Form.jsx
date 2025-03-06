import PropTypes from "prop-types";
import deleteIcon from '../../assets/delete.svg';

function Form({
                  name = "NA",
                  email = "emample@example.com",
                  subject = "NA",
                  message = "message",
                  date = "2020-01-01",
                  onDelete
              }) {
    return (
        <div
            className="flex flex-col text-white gap-3 border
            border-gray-200 px-4 py-8 max-w-50 relative text-wrap break-words">

            <h1 className="text-lg font-bold">{name}</h1>
            <span className="text-md text-gray-400">{email}</span>
            <span className="text-">{subject}</span>
            <p className="text-sm">{message}</p>
            <button className="absolute top-1 right-1" onClick={onDelete}>
                <img src={deleteIcon} alt="Cross Image" className="size-7 cursor-pointer"/>
            </button>
            <small className="absolute right-1 bottom-1 text-gray-500">{date}</small>
        </div>
    );
}

Form.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Form;