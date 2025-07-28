import PropTypes from "prop-types";

function CustomHighlighter({children, language}) {
    let json;
    if (language === 'json') {
        json = JSON.stringify(children, null, 4);
    }

    return (
        <div className="bg-[#1e1e1e] rounded-md ">
            <div className="flex justify-between p-3">
                <small>{language}</small>
                <button className="flex gap-2 select-none text-sm">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"/>
                    </svg>

                    copy
                </button>
            </div>
            <div className="p-5">
                <pre
                    className="json-view"
                    dangerouslySetInnerHTML={{__html: highlightJson(json)}}
                />
            </div>
        </div>
    );
}

function highlightJson(json) {
    if (typeof json !== "string") {
        json = JSON.stringify(json, null, 2);
    }

    return json
        .replace(/(".*?")(?=\s*:)/g, '<span class="text-sky-400">$1</span>')
        .replace(/:\s*"(.*?)"/g, ': <span class="text-lime-400">"$1"</span>')
        .replace(/:\s*(\d+)/g, ': <span class="text-orange-300">$1</span>')
        .replace(/:\s*(true|false)/g, ': <span class="text-indigo-400">$1</span>')
        .replace(/:\s*(null)/g, ': <span class="text-rose-400">$1</span>');
}

CustomHighlighter.propTypes = {
    children: PropTypes.node.isRequired,
    language: PropTypes.string.isRequired
}

export default CustomHighlighter;