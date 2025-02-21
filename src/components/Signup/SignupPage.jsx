import './Signup.css';
import google from '../assets/google.svg';
import github from '../assets/github.svg';
import hide from '../assets/hide.svg';
import show from '../assets/show.svg';
import {Link} from "react-router-dom";
import {useState} from "react";

function SignupPage() {
    const [isVisible, setVisible] = useState(false);

    function toggleVisibility() {
        setVisible((pre) => !pre);
    }

    return (
        <div className="form-container">
            <form action="" className='signup-form'>
                <div className="input-container">
                    <span>Full Name</span>
                    <input name="nane" type="text" placeholder='Full Name'/>
                    <small className='error-message hide'>Error Message</small>
                </div>

                <div className="input-container">
                    <span>Email</span>
                    <input name="nane" type="text" placeholder="example@example.com"/>
                    <small className='error-message hide'>Error Message</small>
                </div>

                <div className="input-container">
                    <span>Create Password</span>
                    <input name="nane" type={isVisible ? 'text' : 'password'} placeholder="create password"/>
                    <small className="error-message hide">Error Message</small>
                    <div className="show-password" onClick={toggleVisibility}>
                        <img src={isVisible ? hide : show} alt="show password"/>
                    </div>
                </div>

                <div className="input-container">
                    <span>Confirm Password</span>
                    <input name="nane" type={isVisible ? 'text' : 'password'} placeholder="confirm password"/>
                    <small className="error-message hide">Error Message</small>
                    <div className="show-password" onClick={toggleVisibility}>
                        <img src={isVisible ? hide : show} alt="show password"/>
                    </div>
                </div>

                <div className="button-container">
                    <button type='submit'>Signup</button>
                </div>

                <div className="separator">
                    <span>or sign up with</span>
                    <hr/>
                </div>

                <div className="social-buttons">
                    <button className="social-button" type='button'>
                        <img src={google} alt='Google'/>
                        <span>Google</span>
                    </button>
                    <button className="social-button" type='button'>
                        <img src={github} alt='Github'/>
                        <span>Github</span>
                    </button>
                </div>

                <div className="login">
                    <span>Have an account? <Link className='link' to='/login'>Login</Link></span>
                </div>
            </form>
        </div>
    );
}

export default SignupPage;