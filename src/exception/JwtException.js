class JwtException extends Error {
    constructor(title, message) {
        super(message);
        this.title = message;
    }
}

export default JwtException;