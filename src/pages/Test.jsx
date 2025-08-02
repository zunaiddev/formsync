import "highlight.js/styles/atom-one-dark.css";
import CodeBlock from "../components/CodeBlock.jsx";

function Test() {
    return <CodeBlock
        code={"fetch('http://localhost:8080/api/public/submit', {\n  method: 'POST',\n  headers: {\n    'X-API-KEY': 'user_api_key_here',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    name: 'John Doe',\n    email: 'email@gmail.com',\n    subject: 'Subject here',\n    message: 'Message should be between 15 to 200 characters'\n  })\n})\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error('Error:', err));"}/>;
}

export default Test;