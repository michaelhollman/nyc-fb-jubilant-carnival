var express = require('express');
var serveStatic = require('serve-static');
var exec = require('child_process').exec;
var app = express();
var port = 4000;

app.use('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(serveStatic('./', { index: ['index.html'] }));

app.listen(port, function() {
  var command = /^win/.test(process.platform) ? 'explorer' : 'open';
  console.log(
    'Example app listening at http://localhost.thorhudl.com:%s',
    port
  );
  exec(command + ' http://localhost.thorhudl.com:4000');
});
