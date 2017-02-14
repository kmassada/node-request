const https = require('https');
const querystring = require('querystring');

process.argv.forEach((val, index, array) => {
  console.log(index + ': ' + val);
});

var count = 5000 
while (count > 0){


var options = {
  hostname: process.argv[2],
  port: 443,
  path: process.argv[3],
  method: 'POST',
  agent: false, // create a new agent just for this one request
  headers: {
	  'Content-Type': 'application/json',
	  'Content-Header': 'testing'
  }
};

var postData = querystring.stringify({
  'msg' : 'Hello World!'
});

var req = https.request(options, (res) => {
  // console.log(`STATUS: ${res.statusCode}`);
  // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    // console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    // console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});


// write data to request body
req.write(postData);
req.end();

count--;
}