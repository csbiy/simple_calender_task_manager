"use strict";
exports.__esModule = true;
var express = require("express");
var nunjucks = require("nunjucks");
var dateScrollDto_1 = require("./model/dateScrollDto");
var schedule_1 = require("./router/schedule");
var user_1 = require("./router/user");
require("dotenv").config();
var app = express();
nunjucks.configure("views", {
    autoescape: true,
    express: app
});
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/user", user_1["default"]);
app.use("/schedule", schedule_1["default"]);
app.listen(process.env.PORT, function () {
    console.log("server executed on" + process.env.PORT);
});
app.post("/month", function (req, res) {
    var dateDto = new dateScrollDto_1.DateScrollDto(Number(req.body["year"]), Number(req.body["month"]), req.body["direction"]);
    dateDto.changeMonthByDirection();
    dateDto.setLastDayOfMonth();
    res.json(dateDto);
});
app.get("/", function (req, res) {
    var today = new Date();
    var dateDto = new dateScrollDto_1.DateScrollDto(today.getFullYear(), today.getMonth() + 1, null);
    res.render("index.html", { dateDto: dateDto });
});
