import {test} from 'vitest';
import {verifyToken} from "../services/authService.js";

test('Check api', async function () {
    let result = await verifyToken("eyJhbGciOiJIUzUxMiJ9.eyJwdXJwb3NlIjoidmVyaWZ5X3VzZXIiLCJpZCI6Miwic3ViIjoid29yazg3dEBnbWFpbC5jb20iLCJpYXQiOjE3NDM5MzA1NzYsImV4cCI6MTc0MzkzMTQ3Nn0.Z-6WlJ4epLUbgwhxmfr-YyYZ7LaENNqPP1J2iOF8AAcKIbRQjBrDDZh8BZ6VuSrv6wvWGkYD_FY68MHuHEvJ8A");
    // let result = await fetchData("/info");
    console.log(result);
}, 100000);