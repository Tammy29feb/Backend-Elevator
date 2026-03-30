const http = require('http');

const testAuth = () => {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/products',
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.end();
};

testAuth();
