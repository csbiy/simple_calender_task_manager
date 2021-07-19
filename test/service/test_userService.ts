import * as userService from "../../service/userService";
import { UserDto } from "../../model/userDto";
import {describe,it} from "mocha";
import {strictEqual}  from "assert";

describe("test_userService",()=>{
    it("member should not have duplicate email",()=>{
        //given 
        const user1 :UserDto = new UserDto({
            email:"test.com" ,
            emailId:"test",
            name:"tester",
            password:"testPw",
            year:"1996",
            month:"07",
            day:"29",
        })
        const user2 :UserDto = new UserDto({
            email:"test.com",
            emailId:"test",
            name:"tester",
            password:"testPw",
            year:"1996",
            month:"07",
            day:"29",
        })
        //when 
        userService.addUser(user1);
        //then 
        let isDuplicateEmail = userService.isNotDuplicateEmail(user2.email);
        strictEqual(isDuplicateEmail,true);
        
        const user3 :UserDto = new UserDto({
            email:"test.com",
            emailId:"different_Email",
            name:"tester",
            password:"testPw",
            year:"1996",
            month:"07",
            day:"29",
        })

        isDuplicateEmail = userService.isNotDuplicateEmail(user3.email);
        strictEqual(isDuplicateEmail,false);

    })
})