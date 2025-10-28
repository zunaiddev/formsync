import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {extractClaims} from "../services/jwtService.js";
import ErrorPopup from "../components/Popup/ErrorPopup.jsx";

function Verification() {
    const [searchParams] = useSearchParams();
    const [purpose, setPurpose] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setError({
                type: "error",
                title: "Invalid or Missing Token",
                message: "The verification link is not valid. Please check the link and try again."
            });
            return;
        }

        const claims = extractClaims(token);
        const purpose = claims?.purpose;

        if (!(purpose && purpose.substring(0, 2) === "VR")) {
            setError({
                type: "error",
                title: "Invalid or Missing Token",
                message: "The verification link is not valid. Please check the link and try again."
            });
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
    }, [searchParams]);

    if (error) {
        const {type, title, message} = error;
        return (
            <Container>
                <ErrorPopup type={type} title={title} message={message}/>
            </Container>
        );
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-950">

        </div>
    );
}

function Container({children}) {
    return <div className="w-full h-screen flex items-center justify-center bg-gray-950">
        {children}
    </div>
}

export default Verification;