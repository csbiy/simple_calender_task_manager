"use strict";
exports.__esModule = true;
var express = require("express");
var nunjucks = require("nunjucks");
var dateScrollDto_1 = require("./model/dateScrollDto");
var app = express();
nunjucks.configure("views", {
    autoescape: true,
    express: app
});
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.listen(process.env.port || 3000, function () {
    console.log("server executed ");
});
app.post("/month", function (req, res) {
    var dateDto = new dateScrollDto_1.DateScrollDto(Number(req.body["year"]), Number(req.body["month"]), req.body["direction"]);
    dateDto.changeMonthByDiection();
    dateDto.setLastDayOfMonth();
    res.json(dateDto);
});
app.get("/", function (req, res) {
    var today = new Date();
    var dateDto = new dateScrollDto_1.DateScrollDto(today.getFullYear(), today.getMonth() + 1, null);
    res.render("index.html", { dateDto: dateDto });
});
