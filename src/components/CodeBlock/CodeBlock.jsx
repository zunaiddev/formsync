import {useEffect, useRef, useState} from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import CopyIcon from "../Icon/CopyIcon.jsx";
import toast from "react-hot-toast";
import CheckIcon from "../Icon/CheckIcon.jsx";

function CodeBlock({code, language = "javascript"}) {
    const codeRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        hljs.highlightElement(codeRef.current);
    }, []);

    async function copy() {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error(e);
            toast.error("Failed to copy")
        }
    }

    return (
        <pre
            className="theme-atom-one-dark shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full rounded-md">
                <span
                    className="hljs mb-0 p-4 block min-h-full overflow-auto">


      <code ref={codeRef} className={`language-${language}`}>
          {code}
      </code>
            </span>
                <small
                    className="bg-black/30 absolute top-0 left-0 uppercase font-bold text-xs rounded-bl-md px-2 py-1">
                    {language}
                </small>
                <button onClick={copy}
                        className="bg-black/30 absolute top-0 right-0 uppercase text-xs rounded-bl-md px-2 py-1 flex items-center justify-center gap-2 cursor-pointer">
                    {copied ? <CheckIcon/> : <>
                        <CopyIcon color="green"/>
                        Copy
                    </>}
                </button>
            </pre>
    );
};

export default CodeBlock;