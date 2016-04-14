"use strict";

var request = require("request");
var crypto = require("crypto");
var transportConfig = require("./transport-config");
var random_ua = require('random-ua');

function getJson(url, query, callback) {
  query["key"] = crypto.randomBytes(64).toString('hex');
  request({
    url: url,
    qs: query,
    json: true,
    agent: false,
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
