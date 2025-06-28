import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  duration: '30s',
  vus: 10, // simulating 1000 virtual users
};

export default function () {

  // 2. Ride endpoint
  const rideRes = http.get('http://localhost:3000/ride');

  check(rideRes, {
    'Ride status is 200 or 201': (res) => res.status === 200 || res.status === 201,
  });

  // 3. User registration (GET instead of POST for testing only)
  const registerRes = http.get('http://localhost:3000/user');

  check(registerRes, {
    'Register status is 200 or 201 or 409': (res) =>
      res.status === 200 || res.status === 201 || res.status === 409,
  });

  sleep(1); // simulate a pause
}
