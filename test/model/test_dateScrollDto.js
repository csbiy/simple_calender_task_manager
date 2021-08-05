"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateScrollDto_1 = require("../../model/dateScrollDto");
var mocha_1 = require("mocha");
var assert_1 = require("assert");
var Direction_1 = require("../../model/enum/Direction");
mocha_1.describe("test_DateScrollDto", function () {
    var testYear = 1996;
    var testMonth = 7;
    mocha_1.it("should decrease Month Value By left arrow icon", function () {
        var testDto_left = new dateScrollDto_1.DateScrollDto(testYear, testMonth, Direction_1.Direction.left);
        testDto_left.changeMonthByDirection();
        assert_1.strictEqual(testDto_left.month, testMonth - 1);
        testDto_left.changeMonthByDirection();
        assert_1.strictEqual(testDto_left.month, testMonth - 2);
    });
    mocha_1.it("should increase Month Value By right arrow icon", function () {
        var testDto_right = new dateScrollDto_1.DateScrollDto(testYear, testMonth, Direction_1.Direction.right);
        testDto_right.changeMonthByDirection();
        assert_1.strictEqual(testDto_right.month, testMonth + 1);
        testDto_right.changeMonthByDirection();
        assert_1.strictEqual(testDto_right.month, testMonth + 2);
    });
    mocha_1.it("should increase Year Value when Month exceed 12 ", function () {
        testMonth = 12;
        var testDto_right = new dateScrollDto_1.DateScrollDto(testYear, testMonth, Direction_1.Direction.right);
        testDto_right.changeMonthByDirection();
        assert_1.strictEqual(testDto_right.month, 1);
        assert_1.strictEqual(testDto_right.year, testYear + 1);
    });
    mocha_1.it("should decrease Year Value when Month lower then 1 ", function () {
        testMonth = 1;
        var testDto_right = new dateScrollDto_1.DateScrollDto(testYear, testMonth, Direction_1.Direction.left);
        testDto_right.changeMonthByDirection();
        assert_1.strictEqual(testDto_right.month, 12);
        assert_1.strictEqual(testDto_right.year, testYear - 1);
    });
    mocha_1.it("should have last day of Month", function () {
        // 테스트 케이스 : 매달: 마지막 날짜 
        var testCase_2021 = {
            1: 31, 2: 28, 3: 31, 4: 30,
            5: 31, 6: 30, 7: 31
        };
        var testYear = 2021;
        for (var month = 1; month < testCase_2021.length + 1; month++) {
            var testDto = new dateScrollDto_1.DateScrollDto(testYear, month, Direction_1.Direction.left);
            testDto.setLastDayOfMonth();
            assert_1.strictEqual(testDto.lastDayOfMonth, testCase_2021[month]);
        }
    });
});
