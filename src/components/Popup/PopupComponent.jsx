import {useEffect, useState} from "react";
import {TriangleAlert} from "lucide-react";

export let showPopup;

const PopupComponent = () => {
    const [popup, setPopup] = useState(null);
    const [animate, setAnimate] = useState(false);

    showPopup = (title, body, {
        icon = <TriangleAlert className="text-amber-500"/>,
        iconBg = "bg-yellow-500/10",
        btn1 = "Cancel",
        btn2 = "Confirm"
    }) => {
        return new Promise((resolve) => {
            setPopup({title, body, icon, btn1, btn2, iconBg, resolve});
            setTimeout(() => setAnimate(true), 10);
        });
    };

    useEffect(() => {
        if (popup) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";

        return () => {
            document.body.style.overflow = "auto"
        };
    }, [popup]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && popup) closePopup(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [popup]);

    const closePopup = (result) => {
        setAnimate(false);
        setTimeout(() => {
            popup?.resolve(result);
            setPopup(null);
        }, 150);
    };

    if (!popup) return null;

    return (
        <div
            className={`fixed inset-0 z-[999] flex items-center justify-center px-3 bg-black/50 transition-opacity duration-150 ${
                animate ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                className={`max-w-md w-full rounded-lg border bg-zinc-900 border-zinc-800 text-zinc-100 p-6 shadow-lg transform transition-all duration-150 ${
                    animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${popup.iconBg}`}>
                        {popup.icon}
                    </div>
                    <h2 className="text-lg font-semibold">{popup.title}</h2>
                </div>

                {popup.body}
                
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        className="h-9 px-4 rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 transition-all"
                        onClick={() => closePopup(false)}
                    >
                        {popup.btn1}
                    </button>

                    <button
                        type="button"
                        className="h-9 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all"
                        onClick={() => closePopup(true)}
                    >
                        {popup.btn2}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupComponent;