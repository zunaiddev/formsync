import styles from './Select.module.css';
import PropTypes from "prop-types";

function Select({label, values, register, error}) {
    return (
        <div className={styles.container} onClick={() => {
            styles.hide
        }}>
            <label>{label}</label>
            <select {...register} className={error ? styles.selectError : ''} defaultValue="">
                <option value="" disabled hidden>Select...</option>
                {values.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            {error && <span>{error.message}</span>}
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
