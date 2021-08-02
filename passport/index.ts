import * as passport from "passport"
import { UserDto } from "../model/userDto";
import * as userRepository from "../repository/userRepository";
const passportConfig = ()=>{
    // login 시 실행되어 session 에 어떤 Data를 저장할지 정하는 method 
    passport.serializeUser((userDto: UserDto ,done)=>{
        done(null,userDto.email);    
    })

// deseriallize는 매 요청시 수행된다 . passport.session middleware가 이 method를 호출 , 조회된 사용자를 req.user에 저장
passport.deserializeUser((id :string,done)=>{
    userRepository.FindByEmail(id)
        .then(user=>done(null,user))
        .catch(err=>done(err));
});


}
export { passportConfig };