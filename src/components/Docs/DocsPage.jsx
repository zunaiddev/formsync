import CodeBlock from "../CodeBlock.jsx";
import PropTypes from "prop-types";

const DocsPage = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const fetchCode = `fetch('${BASE_URL}/api/public/submit', {
  method: 'POST',
  headers: {
    'X-API-KEY': 'fs_test_api_key', // Replace with Your actual api key
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'email@gmail.com',
    subject: 'Subject here',
    message: 'Message should be between 15 to 200 characters'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;

    const headers = {
        'X-API-KEY': "user_api_key_here",
        'Content-Type': "application/json"
    };

    const json = {
        name: "John Doe",
        email: "email@gmail.com",
        subject: "Subject here",
        message: "Message should be between 15 to 200 characters"
    };

    return (
        <div className="w-full mx-auto p-6 text-white rounded-lg shadow-lg space-y-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-400">
                FormSync API Documentation
            </h1>

            <h2 className="text-2xl font-semibold mt-4">Submit Form</h2>

            <Block text="Endpoint" language="http" code={`[POST] ${BASE_URL}/api/public/submit`}/>

            <Block text="Headers" language="json" code={JSON.stringify(headers, null, 4)}/>

            <Block text="Test Your API Integration (Without Signing Up)" desc="Want to try FormSync without registering? Use our Test API Key to simulate form submission. This is
                helpful for checking your integration before creating an account." language="vbnet"
                   code="API Key: fs_test_api_key"/>

            <Block text="Request Body" language="json" code={JSON.stringify(json, null, 4)}/>

            <Block text="Example using Fetch" language="javascript" code={fetchCode}/>

            <h3 className="text-xl font-semibold mt-4">Response Codes</h3>
            <table className="w-full mt-4 border border-gray-700 text-left">
                <thead>
                <tr className="bg-gray-800">
                    <th className="p-2 border border-gray-700">Status Code</th>
                    <th className="p-2 border border-gray-700">Meaning</th>
                    <th className="p-2 border border-gray-700">Condition</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="p-2 border border-gray-700">200 OK</td>
                    <td className="p-2 border border-gray-700 text-green-400">
                        Success
                    </td>
                    <td className="p-2 border border-gray-700">
                        Form submitted successfully.
                    </td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-700 break-words max-w-[120px]">
                        422 UNPROCESSABLE_ENTITY
                    </td>
                    <td className="p-2 border border-gray-700 text-yellow-400">
                        Validation Error
                    </td>
                    <td className="p-2 border border-gray-700 break-words">
                        Missing fields, invalid email, or message length not between
                        15–200 characters.
                    </td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-700 break-words max-w-[120px]">429 TOO_MANY_REQUESTS</td>
                    <td className="p-2 border border-gray-700 text-red-400">
                        Submission Limit Reached
                    </td>
                    <td className="p-2 border border-gray-700">
                        User has exceeded 10 submissions per day.
                    </td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-700 break-words max-w-[120px]">403 FORBIDDEN</td>
                    <td className="p-2 border border-gray-700 text-red-500">
                        Invalid API Key
                    </td>
                    <td className="p-2 border border-gray-700">
                        API key is missing or incorrect.
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
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
