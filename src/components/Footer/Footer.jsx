import './Footer.css';

function Footer() {
    let gitHubUrl = 'https://github.com/zunaiddev/';
    let linkedInUrl = 'https://www.linkedin.com/in/zunaiddev/';

    return (
        <footer className="footer">
            <div className="container">
                <a href={gitHubUrl} target='_blank'>git hub</a>
                <a href={linkedInUrl} target='_blank'>Linked in</a>
            </div>

            <div className="">
                © {new Date().getFullYear()} FormSync. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;