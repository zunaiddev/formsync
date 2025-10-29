import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

function NavMenuItem({to, text, icon, onClick}) {
    return (
        <NavLink to={to}>
            {({isActive}) => (
                <MenuItem icon={icon} text={text} isActive={isActive} onClick={onClick}/>
            )}
        </NavLink>
    );
}

function MenuItem({icon, text, isActive = false, onClick}) {
    return <div role="button" tabIndex="0" onClick={onClick}
                className={`flex items-center w-full p-3 mb-3 rounded-lg 
                     text-start leading-tight transition-all 
                     hover:bg-opacity-80 focus:bg-blue-gray-50 
                     focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80 
                     hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900 
                     outline-none gap-2 cursor-pointer ${isActive && "bg-blue-600 hover:bg-blue-600"} `}>
        <div className="grid place-items-center">
            {icon}
        </div>
        {text}
    </div>
}

NavMenuItem.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    onClick: PropTypes.func.isRequired,
}

export {NavMenuItem, MenuItem};