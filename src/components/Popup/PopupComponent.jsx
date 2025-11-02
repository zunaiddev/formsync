import {useEffect, useState} from "react";
import {TriangleAlert} from "lucide-react";
import {twMerge} from "tailwind-merge";

export let showPopup;

const PopupComponent = () => {
    const [popup, setPopup] = useState(null);
    const [animate, setAnimate] = useState(false);

    showPopup = (title, body, {
        className,
        icon = {
            hide: false,
            icon: <TriangleAlert className="text-amber-500"/>,
            className: "",
        },
        btn1 = {show: true, text: "Cancel", className: ""},
        btn2 = {show: true, text: "Confirm", className: ""},
        closeOnBgClick = false,
    }) => {
        return new Promise((resolve) => {
            setPopup({title, body, icon, btn1, btn2, resolve, closeOnBgClick});
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

    const closePopup = (result) => {
        setAnimate(false);
        setTimeout(() => {
            popup?.resolve(result);
            setPopup(null);
        }, 150);
    };

    function handleOnBgClick() {
        if (popup.closeOnBgClick) {
            closePopup(false);
        }
    }

    if (!popup) return null;

    return (
        <div
            className={`fixed inset-0 z-[999] flex items-center justify-center px-3 bg-black/50 transition-opacity duration-150 ${
                animate ? "opacity-100" : "opacity-0"
            }`} onClick={handleOnBgClick}>
            <div
                className={`max-w-md w-full rounded-lg border bg-zinc-900 border-zinc-800 text-zinc-100 p-6 shadow-lg transform transition-all duration-150 ${
                    animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`} onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4">
                    {!popup.icon.hide && <div
                        className={twMerge("flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20", popup.icon.className)}>
                        {popup.icon.icon}
                    </div>}

                    <h2 className="text-lg font-semibold">{popup.title}</h2>
                </div>

                {popup.body}

                {(popup.btn1.show || popup.btn2.show) && (
                    <div className="flex justify-end gap-3 mt-6">
                        {popup.btn1.show &&
                            <button
                                type="button"
                                className={twMerge("h-9 px-4 rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 transition-all cursor-pointer", popup.btn1.className)}
                                onClick={() => closePopup(false)}
                            >
                                {popup.btn1.text}
                            </button>}

                        {popup.btn2.show &&
                            <button
                                type="button"
                                className={twMerge("h-9 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer", popup.btn2.className)}
                                onClick={() => closePopup(true)}
                            >
                                {popup.btn2.text}
                            </button>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopupComponent;