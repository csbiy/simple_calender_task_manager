"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateScrollDto = void 0;
var Direction_1 = require("./enum/Direction");
var DateScrollDto = /** @class */ (function () {
    function DateScrollDto(year, month, direction) {
        this._year = year;
        this._month = month;
        if (direction == Direction_1.Direction.left) {
            this._direction = Direction_1.Direction.left;
        }
        else {
            this._direction = Direction_1.Direction.right;
        }
    }
    Object.defineProperty(DateScrollDto.prototype, "lastDayOfMonth", {
        get: function () {
            return this._lastDayOfMonth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateScrollDto.prototype, "year", {
        get: function () {
            return this._year;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateScrollDto.prototype, "month", {
        get: function () {
            return this._month;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateScrollDto.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: false,
        configurable: true
    });
    DateScrollDto.prototype.changeMonthByDirection = function () {
        if (this._direction == Direction_1.Direction.right) {
            this._month += 1;
            if (this._month > 12) {
                this._year += 1;
                this._month = 1;
            }
        }
        else if (this.direction == Direction_1.Direction.left) {
            this._month -= 1;
            if (this._month < 1) {
                this._year -= 1;
                this._month = 12;
            }
        }
    };
    DateScrollDto.prototype.setLastDayOfMonth = function () {
        var tmp = new Date(this.year, this.month, 0);
        this._lastDayOfMonth = tmp.getDate();
    };
    return DateScrollDto;
}());
exports.DateScrollDto = DateScrollDto;
