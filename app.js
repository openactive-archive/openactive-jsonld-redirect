var express = require('express');
var logger = require('morgan');
var request = require('request');

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.get('/', function (req, res) {
   // respond with json
  if (/(ld\+)?json/.test(req.headers.accept)) {
    request.get({ url: "https://www.openactive.io/ns/oa.jsonld" }, function(error, response, body) { 
      if (!error && response.statusCode == 200) { 
        res.json(JSON.parse(body));
      } 
    });
  } else {
    res.redirect('https://www.openactive.io/');
  }
});

app.get('/activity-list', function (req, res) {
   // respond with json
  if (/(ld\+)?json/.test(req.headers.accept)) {
    request.get({ url: "https://www.openactive.io/activity-list/activity-list.jsonld" }, function(error, response, body) { 
      if (!error && response.statusCode == 200) { 
        res.json(JSON.parse(body));
      } 
    });
  } else {
    res.redirect('https://www.openactive.io/activity-list/');
  }
});

module.exports = app;