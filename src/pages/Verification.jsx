import {useSearchParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {extractClaims} from "../services/jwtService.js";
import ErrorPopup from "../components/Popup/ErrorPopup.jsx";
import ResetPasswordForm from "../components/Forms/ResetPasswordForm.jsx";
import Authentication from "../components/Authentiction.jsx";

function Verification() {
    const [searchParams] = useSearchParams();
    const [purpose, setPurpose] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const purposes = useMemo(() =>
        new Set(["VERIFY_USER", "RESET_PASSWORD",
            "REACTIVATE", "UPDATE_EMAIL"]), []);

    function setInvalidToken() {
        setError({
            type: "error",
            title: "Invalid or Missing Token",
            message: "The verification link is not valid. Please check the link and try again."
        });
    }

    useEffect(() => {
        const accessToken = searchParams.get("token");

        if (!accessToken) {
            setInvalidToken();
            return;
        }

        const claims = extractClaims(accessToken);

        if (!claims) {
            setInvalidToken();
            return;
        }

        const purpose = claims?.purpose;

        if (!(purpose && purposes.has(purpose))) {
            setInvalidToken()
            return;
        }

        if (claims?.exp * 1000 <= Date.now()) {
            setError({
                type: "warning",
                title: "Verification Link Expired",
                message: "This link has expired. Please request a new verification link to continue."
            });
            return;
        }

        setPurpose(purpose);
        setToken(accessToken);
    }, [searchParams]);

    if (error) {
        const {type, title, message} = error;
        return (
            <Container>
                <ErrorPopup type={type} title={title} message={message}/>
            </Container>
        );
    }

    if (!purpose) {
        return <h1>Loading</h1>;
    }

    return (
        <Container>
            {purpose === "RESET_PASSWORD"
                ? <ResetPasswordForm token={token}/>
                : <Authentication token={token}/>}
        </Container>
    );
}

function Container({children}) {
    return <div className="w-full h-screen flex items-center justify-center bg-gray-800">
        {children}
    </div>
}

export default Verification;