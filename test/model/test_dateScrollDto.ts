import { DateScrollDto } from "../../model/dateScrollDto";
import {describe , it } from "mocha";
import {strictEqual} from "assert";
import {Direction} from "../../model/enum/Direction"

describe("test_DateScrollDto",()=>{

    let testYear : number = 1996;
    let testMonth : number = 7;

    it("should decrease Month Value By left arrow icon",()=>{

        const testDto_left :DateScrollDto = new DateScrollDto(testYear,testMonth,Direction.left);
        testDto_left.changeMonthByDirection();
        strictEqual(testDto_left.month,testMonth-1);
        testDto_left.changeMonthByDirection();
        strictEqual(testDto_left.month,testMonth-2);
        
    })

    it("should increase Month Value By right arrow icon",()=>{

        const testDto_right :DateScrollDto = new DateScrollDto(testYear,testMonth,Direction.right);
        testDto_right.changeMonthByDirection();
        strictEqual(testDto_right.month,testMonth+1);
        testDto_right.changeMonthByDirection();
        strictEqual(testDto_right.month,testMonth+2);
    })

    it("should increase Year Value when Month exceed 12 ",()=>{
        testMonth  = 12;
        const testDto_right :DateScrollDto = new DateScrollDto(testYear,testMonth,Direction.right);
        testDto_right.changeMonthByDirection();
        strictEqual(testDto_right.month,1);
        strictEqual(testDto_right.year,testYear+1);
    })

    it("should decrease Year Value when Month lower then 1 ",()=>{
        testMonth  = 1;
        const testDto_right :DateScrollDto = new DateScrollDto(testYear,testMonth,Direction.left);
        testDto_right.changeMonthByDirection();
        strictEqual(testDto_right.month,12);
        strictEqual(testDto_right.year,testYear-1);
    })

    it("should have last day of Month",()=>{

        // 테스트 케이스 : 매달: 마지막 날짜 
        const testCase_2021 : any = { 
            1:31,2:28,3:31,4:30,
            5:31,6:30,7:31
        }
        let testYear : number = 2021;
        for (let month = 1; month< testCase_2021.length +1 ; month++){
            let testDto :DateScrollDto= new DateScrollDto(testYear,month,Direction.left);
            testDto.setLastDayOfMonth();
            strictEqual(testDto.lastDayOfMonth,testCase_2021[month]);
        }
    })
})