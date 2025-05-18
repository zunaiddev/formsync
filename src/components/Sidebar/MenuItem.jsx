import {ListItem, ListItemPrefix} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

function MenuItem({to, text, icon: Icon, onClick}) {
    return (
        <NavLink to={to} onClick={onClick}>
            {({isActive}) => (
                <ListItem
                    className={`gap-2 cursor-pointer hover:bg-[var(--bg-secondary)] ${isActive && "bg-blue-600 hover:bg-blue-600"}`}>
                    <ListItemPrefix>
                        <Icon className="h-5 w-5"/>
                    </ListItemPrefix>
                    {text}
                </ListItem>
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