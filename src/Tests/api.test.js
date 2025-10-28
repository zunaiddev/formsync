import {test} from 'vitest';
import {extractClaims} from "../services/jwtService.js";

test('Check api', function () {
    try {
        let claims = extractClaims("your.jdshj.djdh");

    } catch (e) {
        console.log(e);
    }
}, 100000);