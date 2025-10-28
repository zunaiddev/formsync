import {Loader2} from "lucide-react";
import {useEffect, useState} from "react";

function AuthenticationLoader() {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-md bg-gray-900 rounded-lg border border-gray-800 p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin"/>
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
                </div>
                <div>
                    <h2 className="text-gray-100 mb-2">
                        Authenticating{dots}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Please wait while we verify your credentials
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AuthenticationLoader;