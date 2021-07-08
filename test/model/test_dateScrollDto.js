"use strict";
exports.__esModule = true;
var dateScrollDto_1 = require("../../model/dateScrollDto");
var mocha_1 = require("mocha");
var assert_1 = require("assert");
mocha_1.describe("test_DateScrollDto", function () {
    var testYear = 1996;
    var testMonth = 7;
    var testDirection = "left";
    mocha_1.it("should decrease Month Value By left arrow icon", function () {
        var testDto_left = new dateScrollDto_1.DateScrollDto(testYear, testMonth, testDirection);
        testDto_left.changeMonthByDirection();
        assert_1.strictEqual(testDto_left.getMonth(), testMonth - 1);
        testDto_left.changeMonthByDirection();
        assert_1.strictEqual(testDto_left.getMonth(), testMonth - 2);
    });
    mocha_1.it("should increase Month Value By right arrow icon", function () {
        testDirection = "right";
        var testDto_right = new dateScrollDto_1.DateScrollDto(testYear, testMonth, testDirection);
        testDto_right.changeMonthByDirection();
        assert_1.strictEqual(testDto_right.getMonth(), testMonth + 1);
        testDto_right.changeMonthByDirection();
        assert_1.strictEqual(testDto_right.getMonth(), testMonth + 2);
    });
    mocha_1.it("should increase Year Value when Month exceed 12 ", function () {
        testMonth = 12;
        testDirection = "right";
        var testDto_right = new dateScrollDto_1.DateScrollDto(testYear, testMonth, testDirection);
        testDto_right.changeMonthByDirection();
        assert_1.strictEqual(testDto_right.getMonth(), 1);
        assert_1.strictEqual(testDto_right.getYear(), testYear + 1);
    });
    mocha_1.it("should decrease Year Value when Month lower then 1 ", function () {
        testMonth = 1;
        testDirection = "left";
        var testDto_right = new dateScrollDto_1.DateScrollDto(testYear, testMonth, testDirection);
        testDto_right.changeMonthByDirection();
        assert_1.strictEqual(testDto_right.getMonth(), 12);
        assert_1.strictEqual(testDto_right.getYear(), testYear - 1);
    });
    mocha_1.it("should have last day of Month", function () {
        // 매달: 마지막 날짜 
        var testCase_2021 = {
            1: 31, 2: 28, 3: 31, 4: 30,
            5: 31, 6: 30, 7: 31
        };
        var testYear = 2021;
        for (var month = 1; month < testCase_2021.length + 1; month++) {
            var testDto = new dateScrollDto_1.DateScrollDto(testYear, month, testDirection);
            testDto.setLastDayOfMonth();
            assert_1.strictEqual(testDto.getLastDayOfMonth(), testCase_2021[month]);
        }
    });
});
