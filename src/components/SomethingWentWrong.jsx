import {AlertTriangle} from "lucide-react";

function SomethingWentWrongPage({message = "Something went wrong. Please try again.", retry}) {
    return (
        <div className="min-h-screen text-white flex flex-col gap-4 justify-center items-center p-6">
            <AlertTriangle className="text-red-500" size={60}/>
            <h1 className="text-2xl font-semibold text-red-400">Oops!</h1>
            <p className="text-gray-300 text-sm leading-relaxed">{message}</p>
            {retry && <button className="hover:bg-gray-500/40 px-2 py-1 cursor-pointer rounded-md" onClick={retry}>
                Try again
            </button>}
        </div>
    );
}

export default SomethingWentWrongPage;