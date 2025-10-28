import {Check, Copy} from "lucide-react";
import {useState} from "react";

export function CodeBlock({code, language = "bash"}) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="relative group">
            <div className="absolute right-3 top-3 z-10">
                <button
                    onClick={copyToClipboard}
                    className="h-8 px-2 text-gray-400 hover:text-white hover:bg-gray-700"
                >
                    {copied ? (
                        <>
                            <Check className="h-4 w-4 mr-1"/>
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4 mr-1"/>
                            Copy
                        </>
                    )}
                </button>
            </div>
            <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-800">
        <code className="text-sm text-gray-300">{code}</code>
      </pre>
        </div>
    );
}

export default CodeBlock;