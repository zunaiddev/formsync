import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function AuthForm({children, isSignup = true}) {
    return (
        <div
            className="text-white w-full max-w-md bg-gray-800/90 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-800">
            <div className="text-center mb-5">
                <h1 className=" text-2xl font-bold mb-1">{isSignup ? "Create Account" : "Welcome Back"}</h1>
                <p className="text-gray-400 text-sm">{isSignup ? "Sign up to get started!" : "Sign in to Access Your Account"}</p>
            </div>

            {children}

            <div className="flex items-center justify-center mt-5">
                <hr className="flex-grow border-gray-700"/>
                <span className="px-2 text-gray-500 text-xs uppercase">or</span>
                <hr className="flex-grow border-gray-700"/>
            </div>

            <div className="flex flex-col gap-3 mt-5">
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 bg-white text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                         className="w-4 h-4"/>
                    Sign {isSignup ? "up" : "in"} with Google
                </button>
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 bg-gray-800 border border-gray-700 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 text-sm"
                >
                    <img src="https://www.svgrepo.com/show/475654/github-color.svg" alt="GitHub"
                         className="w-4 h-4"/>
                    Sign {isSignup ? "up" : "in"} with GitHub
                </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-5">
                {isSignup ? "Already" : "Don't"} have an account?{" "}
                <Link
                    to={`/auth/${isSignup ? "login" : "signup"}`}
                    className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                    Sign {isSignup ? "in" : "up"}
                </Link>
            </p>
        </div>
    );
}

AuthForm.propTypes = {
    children: PropTypes.node.isRequired,
    isSignup: PropTypes.bool,
}

export default AuthForm;