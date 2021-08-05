import * as userRepository from "../../repository/userRepository";
import { UserDto } from "../../model/userDto";
import {it,describe} from "mocha";
import {strictEqual} from "assert";

describe("test_UserRepository",()=>{
    it("should find user by email", async ()=>{

        const email : string  = "email.com";
        const emailId : string = "test";
        const user :UserDto = new UserDto({
            email: email ,
            emailId:emailId,
            name:"tester",
            password:"testPw",
            year:"1996",
            month:"07",
            day:"29",
        })
        await userRepository.addUser(user);
        const foundUser : UserDto =  await userRepository.FindByEmail(emailId+"@"+email);
        strictEqual(foundUser.password,user.password);
        await userRepository.DeleteUserByEmail(emailId+"@"+email);
    })
}
    
)
