var express = require('express');
var logger = require('morgan');
var request = require('request');

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
   // respond with json
  if (/(ld\+)?json/.test(req.headers.accept)) {
    request.get({ url: (process.env.NAMESPACE || "https://www.openactive.io/ns/oa.jsonld") }, function(error, response, body) { 
      if (!error && response.statusCode == 200) { 
        res.json(JSON.parse(body));
      } 
    });
  } else {
    res.redirect(process.env.REDIRECT || 'https://www.openactive.io/');
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

app.get('/activity-list/activity-list.jsonld', function (req, res) {
  // respond with json
  request.get({ url: "https://www.openactive.io/activity-list/activity-list.jsonld" }, function(error, response, body) { 
    if (!error && response.statusCode == 200) { 
      res.json(JSON.parse(body));
    } 
  });
});

app.get('/accessibility-support', function (req, res) {
   // respond with json
  if (/(ld\+)?json/.test(req.headers.accept)) {
    request.get({ url: "https://www.openactive.io/accessibility-support/accessibility-support.jsonld" }, function(error, response, body) { 
      if (!error && response.statusCode == 200) { 
        res.json(JSON.parse(body));
      } 
    });
  } else {
    res.redirect('https://www.openactive.io/accessibility-support/');
  }
});

app.get('/accessibility-support/accessibility-support.jsonld', function (req, res) {
  // respond with json
  request.get({ url: "https://www.openactive.io/accessibility-support/accessibility-support.jsonld" }, function(error, response, body) { 
    if (!error && response.statusCode == 200) { 
      res.json(JSON.parse(body));
    } 
  });
});

app.get('/controlled-vocabularies/:vocab?', function (req, res) {
   // respond with json
  if (!req.params.vocab) {
    res.redirect( (process.env.BASE_URL || "https://www.openactive.io") + "/controlled-vocabularies/");
  } else if (/(ld\+)?json/.test(req.headers.accept)) {
    request.get({ url: (process.env.BASE_URL || "https://www.openactive.io") + "/controlled-vocabularies/" + req.params.vocab + "/" + req.params.vocab + ".jsonld" }, function(error, response, body) { 
      if (!error && response.statusCode == 200) { 
        res.json(JSON.parse(body));
      } 
    });
  } else {
    res.redirect( (process.env.BASE_URL || "https://www.openactive.io") + "/controlled-vocabularies/" + req.params.vocab + "/");
  }
});

app.get('/ns-beta', function (req, res) {
   // respond with json
  if (/(ld\+)?json/.test(req.headers.accept)) {
    request.get({ url: "https://www.openactive.io/ns-beta/beta.jsonld" }, function(error, response, body) { 
      if (!error && response.statusCode == 200) { 
        res.json(JSON.parse(body));
      } 
    });
  } else {
    res.redirect('https://www.openactive.io/ns-beta/');
  }
});

app.get('/extension', function (req, res) {
   // respond with json
  if (/(ld\+)?json/.test(req.headers.accept)) {
    request.get({ url: "https://www.openactive.io/extensions/extensions.jsonld" }, function(error, response, body) { 
      if (!error && response.statusCode == 200) { 
        res.json(JSON.parse(body));
      } 
    });
  } else {
    res.redirect('https://www.openactive.io/extensions/');
  }
});

module.exports = app;
