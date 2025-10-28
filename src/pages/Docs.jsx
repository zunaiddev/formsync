import React from "react";

const CodeBlock = ({children}) => (
    <pre className="bg-[#111827] border border-[#3b4252] p-4 rounded-md text-sm overflow-auto text-[#e5e7eb]">
    {children}
  </pre>
);

const Section = ({title, children}) => (
    <section className="mb-10">
        <h2 className="text-2xl font-bold text-[#7dd3fc] mb-3">{title}</h2>
        <div className="text-sm text-gray-300 leading-relaxed">{children}</div>
    </section>
);

const Docs = () => {
    const curlExample = `curl -X POST 'https://intact-roanna-api-v9-6a640f42.koyeb.app/api/public/submit' \\
-H 'X-API-KEY: your_api_key_here' \\
-H 'Content-Type: application/json' \\
-d '{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "subject": "Hello",\n  "message": "This is a test message"\n}'`;

    const fetchExample = `fetch('https://intact-roanna-api-v9-6a640f42.koyeb.app/api/public/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'your_api_key_here'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Hello',
    message: 'This is a test message'
  })
}).then(res => res.json()).then(console.log).catch(console.error);`;

    const axiosExample = `import axios from 'axios';

axios.post('https://intact-roanna-api-v9-6a640f42.koyeb.app/api/public/submit', {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Hello',
  message: 'This is a test message'
}, {
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'your_api_key_here'
  }
}).then(res => console.log(res.data)).catch(console.error);`;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-[#60a5fa] mb-4">Form Submission API</h1>
                <p className="text-gray-300 mb-8">Send form submissions securely without building your own backend.</p>

                <Section title="Authentication">
                    <p>You must include your API key in the request header:</p>
                    <CodeBlock>{`X-API-KEY: your_api_key_here`}</CodeBlock>
                    <p className="mt-2 text-red-300 font-medium">Requests from unregistered domains will return <code>403
                        FORBIDDEN</code>.</p>
                </Section>

                <Section title="Endpoint">
                    <CodeBlock>{`POST https://intact-roanna-api-v9-6a640f42.koyeb.app/api/public/submit`}</CodeBlock>
                </Section>

                <Section title="Required Fields">
                    <ul className="list-disc ml-5 text-gray-300">
                        <li><strong>name:</strong> 2-50 characters</li>
                        <li><strong>email:</strong> valid email</li>
                        <li><strong>subject:</strong> 2-100 characters</li>
                        <li><strong>message:</strong> 15-200 characters</li>
                    </ul>
                </Section>

                <Section title="Example Request (cURL)">
                    <CodeBlock>{curlExample}</CodeBlock>
                </Section>

                <Section title="JavaScript Example (fetch)">
                    <CodeBlock>{fetchExample}</CodeBlock>
                </Section>

                <Section title="Axios Example (Node/React)">
                    <CodeBlock>{axiosExample}</CodeBlock>
                </Section>

                <Section title="Common Responses">
                    <ul className="list-disc ml-5 text-gray-300">
                        <li><span className="text-green-400 font-semibold">200 OK:</span> success</li>
                        <li><span className="text-red-400 font-semibold">403 FORBIDDEN:</span> invalid/missing API key
                        </li>
                        <li><span className="text-yellow-400 font-semibold">422 UNPROCESSABLE_ENTITY:</span> validation
                            error
                        </li>
                        <li><span className="text-pink-400 font-semibold">429 TOO_MANY_REQUESTS:</span> rate limit
                            exceeded
                        </li>
                    </ul>
                </Section>

                <footer className="mt-16 text-gray-400 text-sm">Need example for another language? Just ask!</footer>
            </div>
        </div>
    );
};

export default Docs;