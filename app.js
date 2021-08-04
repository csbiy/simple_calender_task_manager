"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var express = require("express");
var nunjucks = require("nunjucks");
var passport = require("passport");
var session = require("express-session");
var dateScrollDto_1 = require("./model/dateScrollDto");
var schedule_1 = require("./router/schedule");
var user_1 = require("./router/user");
var auth_1 = require("./router/auth");
var index_1 = require("./passport/index");
var loginStrategyContainer_1 = require("./passport/loginStrategyContainer");
dotenv.config();
var app = express();
// passportStrategy();
loginStrategyContainer_1.LoginStrategy();
index_1.passportConfig();
nunjucks.configure("views", {
    autoescape: true,
    express: app
});
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(session({
    name: "connection.sid",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", auth_1.login);
app.use("/user", user_1.default);
app.use("/schedule", schedule_1.default);
app.listen(process.env.PORT, function () {
    console.log("server executed on " + process.env.PORT);
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
    var user = req.user;
    console.log(req.isAuthenticated());
    if (user) {
        res.render("index.html", { dateDto: dateDto, isLogin: req.isAuthenticated(), name: user.name });
    }
    else {
        res.render("index.html", { dateDto: dateDto, isLogin: req.isAuthenticated() });
    }
});
// error handler 
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send(err);
});
