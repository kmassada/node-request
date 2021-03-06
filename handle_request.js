// Author: Kenneth Massada
var count = 0;
module.exports = (request, response) => {
  console.log('Received request for URL: ' + request.url);
  const headers = request.headers;
  const method = request.method;
  const url = request.url;
  const body = [];
  let printPost = false;
  let json = { 
  	message: "helloWorld"
  };

  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
    console.log('data');
  }).on('end', () => {
    count++;
    console.log(count)
    console.log('end');
    if (printPost) {
      json = JSON.parse(Buffer.concat(body).toString());
      console.log(json);      
    }
    response.on('error', (err) => {
      console.error(err);
    });
  });

  if (request.method === 'POST') {
    printPost = true;
  }

  response.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'server-js'
  });
  
  response.end(JSON.stringify(json));

};