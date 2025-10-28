import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

function MenuItem({to, text, icon, onClick}) {
    return (
        <NavLink to={to} onClick={onClick}>
            {({isActive}) => (
                <div className="flex gap-2 w-full hover:bg-blue-500  rounded-md px-2 py-2 mb-3">
                    {icon}
                    <span>{text}</span>
                </div>
            )}
        </NavLink>
    );
}

MenuItem.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default MenuItem;