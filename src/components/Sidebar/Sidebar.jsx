import PropTypes from "prop-types";

function Sidebar({show, onClose}) {
    let isMobile = window.innerWidth <= 768;

    return (
        <div className={`flex items-center h-screen bg-[var(bg-secondary)] sm:border-r-1 fixed left-0
         top-0 z-10 text-white transition duration-75 ${show ? "translate-x-0" : "translate-x-[-100%]"} ${isMobile && show && "w-screen"}`}>

            {show && isMobile && <div className="w-full h-full bg-none" onClick={onClose}/>}
        </div>
    )
}

Sidebar.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Sidebar;