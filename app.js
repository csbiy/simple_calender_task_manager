"use strict";
exports.__esModule = true;
var express = require("express");
var nunjucks = require("nunjucks");
var app = express();
app.use(express.json());
nunjucks.configure("views", {
    autoescape: true,
    express: app
});
app.use(express.static(__dirname + "/public"));
app.listen(process.env.port || 3000, function () {
    console.log("server executed ");
});
app.post("/month", function (req, res) {
});
app.get("/", function (req, res) {
    var lastDayOfMonth = getLastDayOfMonth();
    res.render("index.html", { lastDayOfMonth: lastDayOfMonth });
});
function getLastDayOfMonth() {
    var today = new Date();
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDayOfMonth;
}
