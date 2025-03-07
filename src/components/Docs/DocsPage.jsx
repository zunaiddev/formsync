import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dracula} from "react-syntax-highlighter/dist/esm/styles/prism";

const DocsPage = () => {
    const fetchCode = `fetch('domainName/api/public/submit', {
  method: 'POST',
  headers: {
    'X-API-KEY': 'user_api_key_here',
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

    const axiosCode = `import axios from 'axios';
axios.post('domainName/api/public/submit', {
  name: 'John Doe',
  email: 'email@gmail.com',
  subject: 'Subject here',
  message: 'Message should be between 15 to 200 characters'
}, {
  headers: {
    'X-API-KEY': 'user_api_key_here',
    'Content-Type': 'application/json'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));`;

    return (
        <div className="w-full mx-auto p-6  text-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-blue-400">FormSync API Documentation</h1>
            <h2 className="text-2xl font-semibold mt-4">Submit Form</h2>
            <p className="mb-4">Users can submit their forms using the following API endpoint.</p>

            <h3 className="text-xl font-semibold mt-4">Endpoint</h3>
            <p className="bg-gray-800 p-2 rounded text-blue-300">POST domainName/api/public/submit</p>

            <h3 className="text-xl font-semibold mt-4">Headers</h3>
            <SyntaxHighlighter language="json" style={dracula}>
                {`{
  "X-API-KEY": "user_api_key_here",
  "Content-Type": "application/json"
}`}
            </SyntaxHighlighter>

            <h3 className="text-xl font-semibold mt-4">Request Body</h3>
            <SyntaxHighlighter language="json" style={dracula}>
                {`{
  "name": "John Doe",
  "email": "email@gmail.com",
  "subject": "Subject here",
  "message": "Message should be between 15 to 200 characters"
}`}
            </SyntaxHighlighter>

            <h3 className="text-xl font-semibold mt-4">Example using Fetch</h3>
            <SyntaxHighlighter language="javascript" style={dracula}>
                {fetchCode}
            </SyntaxHighlighter>

            <h3 className="text-xl font-semibold mt-4">Example using Axios</h3>
            <SyntaxHighlighter language="javascript" style={dracula}>
                {axiosCode}
            </SyntaxHighlighter>

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
                    <td className="p-2 border border-gray-700 text-green-400">✅ Success</td>
                    <td className="p-2 border border-gray-700">Form submitted successfully.</td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-700">422 UNPROCESSABLE_ENTITY</td>
                    <td className="p-2 border border-gray-700 text-yellow-400">❌ Validation Error</td>
                    <td className="p-2 border border-gray-700">Missing fields, invalid email, or message length not
                        between 15-200 characters.
                    </td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-700">429 TOO_MANY_REQUESTS</td>
                    <td className="p-2 border border-gray-700 text-red-400">❌ Submission Limit Reached</td>
                    <td className="p-2 border border-gray-700">User has exceeded 10 submissions per day.</td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-700">403 FORBIDDEN</td>
                    <td className="p-2 border border-gray-700 text-red-500">❌ Invalid API Key</td>
                    <td className="p-2 border border-gray-700">API key is missing or incorrect.</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DocsPage;