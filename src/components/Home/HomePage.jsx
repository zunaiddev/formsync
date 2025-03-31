import {useNavigate} from "react-router-dom";

function HomePage() {
    let navigate = useNavigate();

    return (
        <div className="w-full text-white px-2">
            <main className="w-full flex flex-col items-center justify-center gap-[35vh] py-[25vh]">
                <div className="max-w-[900px] flex flex-col items-center justify-center gap-[5vh] text-center">
                    <h1 className="font-(family-name:--opens-sans) font-bold text-xl sm:text-3xl">FormSync - Form
                        Management Like Never Before</h1>
                    <p className="text-sm sm:text-lg text-[var(--text-secondary)]">Effortlessly collect and manage form
                        submissions
                        using a free API key.
                        FormSync makes it simple
                        for developers, businesses, and students to handle form data without hassle.
                    </p>
                    <div className="space-x-5">
                        <button
                            className="bg-[#0049CE] font-[font-family:--roboto] hover:bg-[#075dfd] text-sm sm:text-md rounded py-[4px] px-[10px] sm:py-[8px] sm:px-[20px] cursor-pointer"
                            onClick={() => navigate("/auth/signup")}>Get
                            Started
                        </button>
                        <button
                            className="hover:bg-[#0049CE] border border-[#0049CE] transition-colors font-[Roboto] text-sm sm:text-md rounded py-[4px] px-[10px] sm:py-[8px] sm:px-[20px] cursor-pointer"
                            onClick={() => navigate("/dashboard")}>Dashboard
                        </button>
                    </div>
                </div>

                <div className="w-full flex flex-col items-center justify-center justify-self-start gap-8 p-5">
                    <h1 className="font-(family-name:--opens-sans) font-bold text-xl sm:text-3xl">Why Choose
                        FormSync?</h1>
                    <p className="font-(family-name:--roboto) text-sm sm:text-1xl"> Have questions or need
                        assistance? Contact us at support@freedb.tech</p>
                    <div
                        className="max-w-[500px] flex flex-col items-center justify-center gap-8 p-5  shadow-xl">
                        <h4 className="text-md">Introducing FreeDB: Your Ultimate Solution for Remote MySQL Database
                            Management</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Simplify and streamline your form submission
                            process with FormSync. Generate an API key,
                            submit forms, and manage them effortlessly using our user-friendly dashboard.</p>
                        <p className="text-sm text-[var(--text-secondary)]">Whether you&#39;re a developer, student, or
                            business owner, FormSync provides a reliable and
                            free
                            solution for handling form data efficiently.</p>
                    </div>
                </div>

                <div className="max-w-[700px] flex flex-col items-center gap-4 text-center">
                    <h1 className="font-(family-name:--opens-sans) font-bold text-xl sm:text-3xl">Simple & Transparent
                        Pricing</h1>
                    <p className="text-sm sm:text-md">FormSync is completely
                        free! No
                        hidden charges, no premium plans—just a powerful tool for
                        managing your form submissions efficiently.</p>
                </div>
            </main>
        </div>
    );
}

export default HomePage;