import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import {twMerge} from "tailwind-merge";

function InputField({
                        label = null, placeholder = "", autoComplete, type = "text",
                        register, error, autoFocus = false, className, ref
                    }) {
    const [show, setShow] = useState(false);

    function handleShow() {
        setShow(!show);
    }

    return (
        <div className="w-full flex flex-col">
            {label && <label className="block mb-1 text-sm font-medium text-gray-300">{label}</label>}
            <div className="relative">
                <input ref={ref}
                       className={twMerge(`shadow-xs border border-gray-700 text-sm rounded-sm focus:border-blue-500 outline-none block w-full p-2.5 bg-gray-700 
                     placeholder-gray-400 text-white
                      ${error && "border-red-600"} ${type === "password" && "pr-9"}`, className)}
                       autoFocus={autoFocus}
                       placeholder={placeholder}
                       autoComplete={autoComplete}
                       type={type === "password" ? (show ? "text" : "password") : type}
                       {...register}/>
                {type === "password" && (
                    <button type="button"
                            className="absolute top-[50%] bottom-[50%] translate-y-[-50%] right-2 text-gray-400 size-5 cursor-pointer"
                            onClick={handleShow}>
                        {show ? <Eye size={19}/> : <EyeOff size={19}/>}
                    </button>
                )}

            </div>

            {error?.message &&
                <span className="bottom-0 text-[12px] ml-1 text-red-600 mt-1">{error.message}</span>}
        </div>
    );
}

export default InputField;