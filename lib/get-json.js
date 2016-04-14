"use strict";

var request = require("request");
var crypto = require("crypto");
var transportConfig = require("./transport-config");
var random_ua = require('random-ua');

function getJson(url, query, callback) {
  query["key"] = crypto.randomBytes(64).toString('hex');
  var proxies = [
    'http://173.234.249.77:8800',
    'http://173.234.249.137:8800',
    'http://173.208.39.181:8800',
    'http://173.208.39.138:8800',
    'http://173.234.249.48:8800',
    'http://173.232.7.114:8800',
    'http://173.234.226.230:8800',
    'http://173.232.7.39:8800',
    'http://173.234.226.27:8800',
    'http://173.234.249.205:8800'
  ];
  request({
    url: url,
    qs: query,
    json: true,
    agent: false,
    proxy: proxies[Math.floor(Math.random()*proxies.length)],
    timeout: transportConfig.timeout,
    headers: {
      "user-agent": random_ua.generate(),
      "referer": "http://stats.nba.com/scores/"
    }
  }, function (err, resp, body) {
    if (err == null && resp != null && resp.statusCode !== 200) {
      err = new Error("HTTP error: " + resp.statusCode + " " + body.Message);
    }

    if (resp == null) {
      err = new Error("No response.");
    }

    callback(err, body);
  });
};

module.exports = getJson;
