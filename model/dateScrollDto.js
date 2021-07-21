"use strict";
exports.__esModule = true;
exports.DateScrollDto = void 0;
var Direction_1 = require("./enum/Direction");
var DateScrollDto = /** @class */ (function () {
    function DateScrollDto(year, month, direction) {
        this.year = year;
        this.month = month;
        if (direction == Direction_1.Direction.left) {
            this.direction = Direction_1.Direction.left;
        }
        else {
            this.direction = Direction_1.Direction.right;
        }
    }
    DateScrollDto.prototype.getLastDayOfMonth = function () {
        return this.lastDayOfMonth;
    };
    DateScrollDto.prototype.getYear = function () {
        return this.year;
    };
    DateScrollDto.prototype.getMonth = function () {
        return this.month;
    };
    DateScrollDto.prototype.getDirection = function () {
        return this.direction;
    };
    DateScrollDto.prototype.changeMonthByDirection = function () {
        if (this.direction == Direction_1.Direction.right) {
            this.month += 1;
            if (this.month > 12) {
                this.year += 1;
                this.month = 1;
            }
        }
        else if (this.direction == Direction_1.Direction.left) {
            this.month -= 1;
            if (this.month < 1) {
                this.year -= 1;
                this.month = 12;
            }
        }
    };
    DateScrollDto.prototype.setLastDayOfMonth = function () {
        var tmp = new Date(this.year, this.month, 0);
        this.lastDayOfMonth = tmp.getDate();
    };
    return DateScrollDto;
}());
exports.DateScrollDto = DateScrollDto;
