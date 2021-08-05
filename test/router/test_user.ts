import * as chai        from 'chai';
import {app}            from "../../app";
import { UserDto }      from '../../model/userDto';
import chaiHttp         = require('chai-http');

chai.use(chaiHttp);

describe("API Request ",()=>{
    it("should redirect index after user registration",()=>{


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

        chai.request(app)
            .post("/user")
            .set("Content-Type","application/json")
            .send({
                
            })

        }
    )}
);