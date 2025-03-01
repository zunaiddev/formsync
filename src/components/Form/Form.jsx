import PropTypes from "prop-types";
import deleteIcon from '../../assets/delete.svg';
import style from './form.module.css';

function Form({
                  name = "NA",
                  email = "emample@example.com",
                  subject = "NA",
                  message = "message",
                  date = "2020-01-01",
              }) {
    return (
        <div className={style.container}>
            <h1 className={style.name}>{name}</h1>
            <span className={style.email}>{email}</span>
            <span className={style.subject}>{subject}</span>
            <p className={style.message}>{message}</p>
            <button className={style.deleteBtn}>
                <img src={deleteIcon} alt="Cross Image"/>
            </button>
            <small className={style.date}>{date}</small>
        </div>
    );
}

Form.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.string,
    formId: PropTypes.number.isRequired,
}

export default Form;