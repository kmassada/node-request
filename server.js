const http = require('http');
const handleRequest = (request, response) => {
  console.log('Received request for URL: ' + request.url);
  const headers = request.headers;
  const method = request.method;
  const url = request.url;
  const body = [];
  var json = JSON.stringify({ 
  	message: "helloWorld"
  });

  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
    console.log('data');
  }).on('end', () => {
    json = JSON.parse(Buffer.concat(body).toString());
    console.log('end');
    console.log(json);
    response.on('error', (err) => {
      console.error(err);
    });
  });

  if (request.method === 'POST') {
   	console.log('post-request');
  }

  response.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'server-js'
  });
  
  response.end(json);

};
const www = http.createServer(handleRequest);
www.listen(80);
