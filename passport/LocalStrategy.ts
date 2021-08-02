import * as passport from "passport";
import   { Strategy as localStrategy }  from "passport-local";
import {compareSync} from "bcrypt";
import {UserDto} from "../model/userDto";
import * as userRepository from "../repository/userRepository";

module.exports = ()=>{
    passport.use(new localStrategy({
        usernameField : 'email',
        passwordField:'password',
    },async(email,password,done)=>{
        try{
            const exUser :UserDto= await userRepository.FindByEmail(email);
            if(exUser){
                 const result :boolean = await compareSync(password,exUser.password);
                 if(result){
                        done(null,exUser);
                 }else{
                     done(null,false,{message:"비밀번호가 일치하지 않습니다."});
                 }
            }else{
                done(null,false,{message:"아이디와 일치하는 회원이 없습니다."});
            }
        }catch(error){
            console.log(error);
            done(error);
        }
    }))
}
