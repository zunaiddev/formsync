import './Home.css'

function HomePage() {
    return (
        <div className="home-page">
            <div className='welcome'>
                <h1>Welcome to Form Sync - Effortless Form Data Management</h1>
                <h3>Simplify Your Form Submissions with API Integration</h3>
                <p>Tired of handling form data manually? FormSync provides a powerful API solution to collect, manage,
                    and analyze form submissions with ease. Generate your API key & custom endpoint, receive real-time
                    data
                    updates, and track API requests seamlessly—all from a single dashboard.</p>
                <div className='buttons'>
                    <button className='get-started-btn'>Get Started</button>
                    <button className='docs-btn'>Docs</button>
                </div>
            </div>

            <div className='why-chose component'>
                <h1> Why Choose FormSync?</h1>
                <ul>
                    <li>Instant API Key & Endpoint – Get your API key and a custom endpoint instantly after signup.</li>
                    <li>Real-Time Webhook Integration – Receive instant updates whenever a form is submitted.</li>
                    <li>Data Filtering & Sorting – Search and filter submissions by date, status, and more.</li>
                    <li>Customizable API Endpoints – Modify the API URL to fit your project requirements.</li>
                    <li>Submission Logs & Analytics – View detailed request logs, including timestamps and status.</li>
                    <li>Secure & Reliable – Built-in data validation to prevent spam and protect your API.</li>
                </ul>

            </div>

            <div className='features component'>
                <h1>Powerful Features for Developers</h1>
                <ul>
                    <li>API Key Management– Generate, revoke, and manage API keys securely.</li>
                    <li>Webhook Support – Get notified in real-time when data is submitted.</li>
                    <li>Form Submission Dashboard– View, sort, and analyze collected form data.</li>
                    <li>Data Export (CSV/JSON)– Download form submissions for offline use.</li>
                    <li>Advanced Security & Validation – Set rules for accepted fields and protect against spam.</li>
                </ul>
            </div>

            <div className='works component'>
                <h1>How It Works?</h1>
                <ul>
                    <li>Get Your API Key & Endpoint – Instantly receive your unique API URL and key.</li>
                    <li>Integrate with Your Website – Use the API endpoint to submit form data.</li>
                    <li>Track & Manage Submissions – View incoming data in real-time, apply filters, and export.</li>
                    <li>Analyze & Secure Your API – Monitor request logs and apply validation rules.</li>
                </ul>
            </div>
        </div>
    );
}

export default HomePage;