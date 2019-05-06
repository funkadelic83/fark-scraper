var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var databaseUrl = "scraper";
var collections = ["scrapedData"];
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});

app.get("/", function(req, res) {
    res.send("Hello World!");
});

axios.get("https://www.fark.com").then(function(response) {
    var $ = cheerio.load(response.data);
    var results = [];

$("span.headline").each(function(i, element) {
    var title = $(element).text();
    var link = $(element).find("a").attr("href");

    results.push({
        title: title,
        link: link
    });
});

console.log(results);
});