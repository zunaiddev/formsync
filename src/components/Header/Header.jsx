import logo from "../assets/logo.png";
import dashboard from "../assets/dashboard.png";
import './Header.css'
import {NavLink, useNavigate} from 'react-router-dom'

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className='logo-container'>
                <img className='logo' src={logo} alt='logo'/>
            </div>

            <ul className="nav">
                <li className="nav-item "><NavLink className='link' to='/'>Home</NavLink></li>
                <li className="nav-item "><NavLink className='link' to='/about'>About</NavLink></li>
                <li className="nav-item "><NavLink className='link' to='/docs'>Docs</NavLink></li>
                <li className="nav-item "><NavLink className='link' to='contact'>contact</NavLink></li>
            </ul>

            <div className='buttons'>
                <button className="dashboard" onClick={() => navigate('/dashboard')}>
                    <img src={dashboard} alt="dashboard"/>
                    Dashboard
                </button>
                <button className='button login-btn' onClick={() => navigate('/login')}>Login</button>
                <button className='button signup-btn' onClick={() => navigate('/signup')}>Signup</button>
            </div>
        </header>
    );
}

export default Header;
