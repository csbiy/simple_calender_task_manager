"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var scheduleService = require("../service/scheduleService");
var scheduleDto_1 = require("../model/scheduleDto");
var auth_1 = require("./auth");
var router = express.Router();
router.post("/", auth_1.isLoggedIn, function (req, res) {
    var schedule = new scheduleDto_1.ScheduleDto(req.body, false);
    scheduleService.addSchedule(schedule);
});
exports.default = router;
