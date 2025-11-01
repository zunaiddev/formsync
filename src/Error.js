import {HttpStatusCode} from "axios";

class Unauthorized extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;
        this.response = {active: HttpStatusCode.Unauthorized};
        this.code = "ERR_CUSTOM";
    }
}

export default Unauthorized;