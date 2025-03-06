import styles from './Home.module.css';
import {useNavigate} from "react-router-dom";

function HomePage() {
    let navigate = useNavigate();

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.hero}>
                    <h1>FormSync - Form Management Like Never Before</h1>
                    <p>Effortlessly collect and manage form submissions using a free API key. FormSync makes it simple
                        for developers, businesses, and students to handle form data without hassle.
                    </p>
                    <div className={styles.buttons}>
                        <button onClick={() => navigate("/auth/signup")}>Get Started</button>
                        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                    </div>
                </div>

                <div className={styles.whyChoose}>
                    <h1>Why Choose FormSync?</h1>
                    <p>Have questions or need assistance? Contact us at support@freedb.tech</p>
                    <div className={styles.intro}>
                        <h4>Introducing FreeDB: Your Ultimate Solution for Remote MySQL Database Management</h4>
                        <p>Simplify and streamline your form submission process with FormSync. Generate an API key,
                            submit forms, and manage them effortlessly using our user-friendly dashboard.</p>
                        <p>Whether you&#39;re a developer, student, or business owner, FormSync provides a reliable and
                            free
                            solution for handling form data efficiently.</p>
                    </div>
                </div>

                <div className={styles.pricing}>
                    <h1>Simple & Transparent Pricing</h1>
                    <p>FormSync is completely free! No hidden charges, no premium plans—just a powerful tool for
                        managing your form submissions efficiently.</p>
                </div>
            </main>
        </div>
    );
}

export default HomePage;