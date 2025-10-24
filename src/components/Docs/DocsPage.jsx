import CodeBlock from "../CodeBlock/CodeBlock.jsx";
import PropTypes from "prop-types";

const DocsPage = () => {
    return <h1>Docs</h1>;
};

function Block({text, desc, language, code}) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold mt-4">{text}</h3>
            {desc && <p>{desc}</p>}
            {(language && code) && <CodeBlock language={language} code={code}/>}
        </div>
    );
}

Block.propTypes = {
    text: PropTypes.string.isRequired,
    desc: PropTypes.string,
    language: PropTypes.string,
    code: PropTypes.string,
}

export default DocsPage;
