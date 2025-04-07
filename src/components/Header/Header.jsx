import logo from '../../../public/logo.png';
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <div className="flex items-center justify-between w-full px-4 py-2">
            <div className="flex items-center justify-between gap-2">
                <img src={logo} alt="logo" className="size-8"/>
                <span className="font-bold text-white">FORM SYNC</span>
            </div>

            <div className="flex items-center justify-between text-gray-400 ">
                <nav className="flex items-center justify-between gap-4">
                    <NavLink to="/" className={({isActive}) =>
                        isActive ? "text-white" : "hover:text-gray-500"}>
                        Home
                    </NavLink>

                    <NavLink to="/docs" className={({isActive}) =>
                        isActive ? "text-white" : "hover:text-gray-500"}>
                        Docs
                    </NavLink>

                    <NavLink to="/contact" className={({isActive}) =>
                        isActive ? "text-white" : "hover:text-gray-500"
                    }>Contact</NavLink>
                </nav>
            </div>
        </div>
    );
}

export default Header;