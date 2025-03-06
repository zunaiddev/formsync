import styles from './Footer.module.css';
import linkedinIcon from '../../assets/linkedin.svg';
import githubIcon from '../../assets/github.svg';
import {Link} from "react-router-dom";

function Footer() {

    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.about}>
                    <h3>About us</h3>
                    <p>FormSync provides free API-based form submission and a reliable platform to manage your data
                        effortlessly.</p>
                </div>
                <div className={styles.links}>
                    <h3>Useful Links</h3>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">Docs</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className={styles.follow}>
                    <h3>Follow Us</h3>
                    <div className={styles.socials}>
                        <img src={linkedinIcon} alt="LinkedIn"
                             onClick={() => window.open("https://www.linkedin.com/in/zunaiddev", "_blank")}/>
                        <img src={githubIcon} alt="LinkedIn"
                             onClick={() => window.open("https://github.com/zunaiddev", "_blank")}/>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>© {new Date().getFullYear()} FormSync. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;