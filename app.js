"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var passport_local_1 = require("passport-local");
var userRepository = require("./repository/userRepository");
var bcrypt_1 = require("bcrypt");
dotenv.config();
var app = express();
passport.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, function (email, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var exUser, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, userRepository.FindByEmail(email)];
            case 1:
                exUser = _a.sent();
                if (!exUser) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.compareSync(password, exUser.password)];
            case 2:
                result = _a.sent();
                if (result) {
                    done(null, exUser);
                }
                else {
                    done(null, false, { message: "비밀번호가 일치하지 않습니다." });
                }
                return [3 /*break*/, 4];
            case 3:
                done(null, false, { message: "아이디와 일치하는 회원이 없습니다." });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                done(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); }));
index_1.passportConfig();
nunjucks.configure("views", {
    autoescape: true,
    express: app
});
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
app.use("/auth", auth_1.login);
app.use("/user", user_1.default);
app.use("/schedule", schedule_1.default);
app.use(passport.initialize());
app.use(passport.session());
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
    res.render("index.html", { dateDto: dateDto });
});
