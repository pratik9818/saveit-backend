import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 10, // Virtual users
    duration: '10s', // Test duration
};


// export default function  () {
//     const url = 'http://localhost:3000/api/v1/capsules';
//     const headers = {
//         'Content-Type': 'application/json',
//         'Cookie': 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjNkZmU4YjQtNDk4ZS00OTA2LThhZjQtMDk0NDQ1NjUwYmI1IiwiaWF0IjoxNzI4MjAzNzAyLCJleHAiOjE3MzU5Nzk3MDJ9.1xzZ682A9jJKAys6yNlec9bT5oPTSMgSLReQTLgH5wQ;', // Example JWT token
//     };
//     const body = JSON.stringify({
//         capsuleName : 'load tesing'
//     })
//     const response = http.post(url, body,{ headers });
//     check(response, {
//         'status is 201': (r) => r.status === 201,
//         'response time is less than 1s': (r) => r.timings.duration < 1000,
//     }); 

//     sleep(1);
// }
// export default function () {
//     const url = 'http://localhost:3000/api/v1/capsule/002d7a52-8ca3-4d72-81fd-c60d62ee763b';
//     const headers = {
//         'Content-Type': 'application/json',
//         'Cookie': 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjNkZmU4YjQtNDk4ZS00OTA2LThhZjQtMDk0NDQ1NjUwYmI1IiwiaWF0IjoxNzI4MjAzNzAyLCJleHAiOjE3MzU5Nzk3MDJ9.1xzZ682A9jJKAys6yNlec9bT5oPTSMgSLReQTLgH5wQ;', // Example JWT token
//     };
//     const body = JSON.stringify({
//         capsuleName : 'rename'
//     })
//     // Send the GET request with headers
//     const response = http.put(url, body,{ headers });
//     // console.log(`Response status: ${response.status}`);
//     // console.log(`Response body: ${response.body}`);

//     // Check if the response was successful (status code 200)
//     check(response, {
//         'status is 200': (r) => r.status === 200,
//         'response time is less than 1000ms': (r) => r.timings.duration < 1000,
//     }); 

//     sleep(1);
// }

export default function () {
    const dateModified = new Date().toUTCString()
    const url = `http://localhost:3000/api/v1/capsules?dateModified=${dateModified}`;
    const headers = {
        'Cookie': 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjNkZmU4YjQtNDk4ZS00OTA2LThhZjQtMDk0NDQ1NjUwYmI1IiwiaWF0IjoxNzI4MjAzNzAyLCJleHAiOjE3MzU5Nzk3MDJ9.1xzZ682A9jJKAys6yNlec9bT5oPTSMgSLReQTLgH5wQ;', // Example JWT token
    };

    const response = http.get(url,{ headers });
    console.log(`Response status: ${response.status}`);
    console.log(`Response body: ${response.body}`);
    check(response, {
        'status is 201': (r) => r.status === 200,
        'response time is less than 1s': (r) => r.timings.duration < 1000,
    }); 

    sleep(1);
}