import JwtException from "./JwtException.js";

class InvalidTokenException extends JwtException {
    constructor() {
        super("Invalid or Missing Token", "The verification link is not valid. Please check the link and try again.");
    }
}

export default InvalidTokenException;