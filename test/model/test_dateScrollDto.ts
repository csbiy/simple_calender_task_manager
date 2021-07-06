import { DateScrollDto } from "../../model/dateScrollDto";
import {describe , it } from "mocha";
import {strictEqual} from "assert";

describe("test_DateScrollDto",()=>{

    let testYear : number = 1996;
    let testMonth : number = 7;
    let testDirection : string = "left";

    it("should decrease Month Value By left arrow icon",()=>{

        const testDto_left :DateScrollDto = new DateScrollDto(testYear,testMonth,testDirection);
        testDto_left.changeMonthByDirection();
        strictEqual(testDto_left.getMonth(),testMonth-1);
        testDto_left.changeMonthByDirection();
        strictEqual(testDto_left.getMonth(),testMonth-2);
    })

    it("should increase Month Value By right arrow icon",()=>{

        testDirection  = "right";
        const testDto_right :DateScrollDto = new DateScrollDto(testYear,testMonth,testDirection);
        testDto_right.changeMonthByDirection();
        strictEqual(testDto_right.getMonth(),testMonth+1);
        testDto_right.changeMonthByDirection();
        strictEqual(testDto_right.getMonth(),testMonth+2);
    })

    it("should increase Year Value when Month exceed 12 ",()=>{
        testMonth  = 12;
        testDirection = "right";
        const testDto_right :DateScrollDto = new DateScrollDto(testYear,testMonth,testDirection);
        testDto_right.changeMonthByDirection();
        strictEqual(testDto_right.getMonth(),1);
        strictEqual(testDto_right.getYear(),testYear+1);
    })

    it("should decrease Year Value when Month lower then 1 ",()=>{
        testMonth  = 1;
        testDirection = "left";
        const testDto_right :DateScrollDto = new DateScrollDto(testYear,testMonth,testDirection);
        testDto_right.changeMonthByDirection();
        strictEqual(testDto_right.getMonth(),12);
        strictEqual(testDto_right.getYear(),testYear-1);
    })

    it("should have last day of Month",()=>{

        // 테스트 케이스 : 매달: 마지막 날짜 
        const testCase_2021 : any = { 
            1:31,2:28,3:31,4:30,
            5:31,6:30,7:31
        }
        let testYear : number = 2021;
        for (let month = 1; month< testCase_2021.length +1 ; month++){
            let testDto :DateScrollDto= new DateScrollDto(testYear,month,testDirection);
            testDto.setLastDayOfMonth();
            strictEqual(testDto.getLastDayOfMonth(),testCase_2021[month]);
        }
    })
})