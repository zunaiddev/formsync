import JwtException from "./JwtException.js";

class ExpiredTokenException extends JwtException {
    constructor() {
        super("Verification Link Expired", "This link has expired. Please request a new verification link to continue.");
    }
}

export default ExpiredTokenException;