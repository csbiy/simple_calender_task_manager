import   { Strategy as LocalStrategy }  from "passport-local";
import {compareSync} from "bcrypt";
import {UserDto} from "../model/userDto";
import * as userRepository from "../repository/userRepository";

const local :LocalStrategy= new LocalStrategy({
    usernameField : 'email',
    passwordField:'password',
},async(email,password,done)=>{
    try{
        const exUser :UserDto= await userRepository.FindByEmail(email);
        console.log(exUser);
        if(exUser){
             const result :boolean =  compareSync(password,exUser.password);
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
})

export { local }