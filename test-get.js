import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/products/l6Hzr5gY07WSUIKLsMw1',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();
