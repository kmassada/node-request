// Author: Kenneth Massada
const https = require('https');
const crypto = require('crypto');
const  fs = require("fs");
var options = {
  key: fs.readFileSync('key/server.key'),
  cert: fs.readFileSync('key/server.crt')
};
const handleRequest = require('./handle_request'); 
const www = https.createServer(options, handleRequest);
www.listen(8443);
