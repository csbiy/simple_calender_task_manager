import * as passport from "passport"
import * as local from "passport-local";
import * as kakao from "passport-kakao";
import { UserDto } from "../model/userDto";
()=>{
    passport.serializeUser((UserDto: UserDto,done)=>{
        done(null,UserDto.email);       
    })
}

export {
}