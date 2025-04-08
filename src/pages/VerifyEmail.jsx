import {Link} from "react-router-dom";

function VerifyEmail() {
    return (
        <div className="text-white flex items-center justify-center min-h-screen w-full px-4">

            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg max-w-sm text-center">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                    alt="Email Icon"
                    className="w-16 h-16 mx-auto mb-4"
                />
                <h1 className="text-xl mb-2 font-bold">Please Verify Your Email</h1>
                <p className="text-slate-300 text-sm mb-4">
                    We&#39;ve sent a verification link to your email. Kindly check your inbox and click the link to
                    complete
                    your registration.
                </p>
                <Link
                    className="mt-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-xl font-medium transition-all duration-300"
                    to="/auth/login">
                    go back to login
                </Link>
            </div>

        </div>
    );
}

export default VerifyEmail;