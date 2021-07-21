"use strict";
exports.__esModule = true;
var express = require("express");
var scheduleService = require("../service/scheduleService");
var scheduleDto_1 = require("../model/scheduleDto");
var router = express.Router();
router.post("/", function (req, res) {
    var schedule = new scheduleDto_1.ScheduleDto(req.body, false);
    scheduleService.addSchedule(schedule);
});
exports["default"] = router;
