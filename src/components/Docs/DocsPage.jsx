import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { lazy, Suspense } from "react";

const SyntaxHighlighter = lazy(() => import("react-syntax-highlighter"));

const DocsPage = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchCode = `fetch('${BASE_URL}/api/public/submit', {
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
axios.post('${BASE_URL}/api/public/submit', {
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
      <h1 className="text-3xl font-bold mb-4 text-blue-400">
        FormSync API Documentation
      </h1>
      <h2 className="text-2xl font-semibold mt-4">Submit Form</h2>

      <h3 className="text-xl font-semibold mt-4">Endpoint</h3>
      <p className="bg-gray-800 p-2 rounded text-white">
        <span className="text-yellow-400">[POST]</span> {BASE_URL}
        /api/public/submit
      </p>

      <h3 className="text-xl font-semibold mt-4">Headers</h3>
      <Suspense fallback={null}>
        <SyntaxHighlighter language="json" style={a11yDark}>
          {`{
             "X-API-KEY": "Your-Api-Key",
            "Content-Type": "application/json"
            }`}
        </SyntaxHighlighter>
      </Suspense>

      <h3 className="text-xl font-semibold mt-4">Request Body</h3>
      <Suspense fallback={null}>
        <SyntaxHighlighter language="json" style={a11yDark}>
          {`{
                "name": "John Doe",
                "email": "email@gmail.com",
                "subject": "Subject here",
                "message": "Message should be between 15 to 200 characters"
                }`}
        </SyntaxHighlighter>
      </Suspense>

      <h3 className="text-xl font-semibold mt-4">Example using Fetch</h3>
      <Suspense fallback={null}>
        <SyntaxHighlighter language="javascript" style={a11yDark}>
          {fetchCode}
        </SyntaxHighlighter>
      </Suspense>

      <h3 className="text-xl font-semibold mt-4">Example using Axios</h3>

      <Suspense fallback={null}>
        <SyntaxHighlighter language="javascript" style={a11yDark}>
          {axiosCode}
        </SyntaxHighlighter>
      </Suspense>

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
              ✅ Success
            </td>
            <td className="p-2 border border-gray-700">
              Form submitted successfully.
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-700 ">
              422 UNPROCESSABLE_ENTITY
            </td>
            <td className="p-2 border border-gray-700 text-yellow-400">
              ❌ Validation Error
            </td>
            <td className="p-2 border border-gray-700 break-words">
              Missing fields, invalid email, or message length not between
              15-200 characters.
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-700">
              429 TOO_MANY_REQUESTS
            </td>
            <td className="p-2 border border-gray-700 text-red-400">
              ❌ Submission Limit Reached
            </td>
            <td className="p-2 border border-gray-700">
              User has exceeded 10 submissions per day.
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-700">403 FORBIDDEN</td>
            <td className="p-2 border border-gray-700 text-red-500">
              ❌ Invalid API Key
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

export default DocsPage;
