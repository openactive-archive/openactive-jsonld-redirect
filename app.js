var express = require('express');
var logger = require('morgan');
var request = require('request');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(function(req, res, next){
   // respond with json
  if (/ld\+json/.test(req.headers.accept) || req.accepts('json')) {
    request.get({ url: "https://www.openactive.io/ns/oa.jsonld" }, function(error, response, body) { 
      if (!error && response.statusCode == 200) { 
          res.json(JSON.parse(body));
      } 
    });
  } else {
    res.redirect('https://www.openactive.io/');
    return;
  }
});

module.exports = app;