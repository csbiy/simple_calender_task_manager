import * as passport from "passport";
import {kakao} from "./kakaoStrategy";
import {local} from "./LocalStrategy";
import {twitter} from "./twitterStrategy";
import {github} from "./githubStrategy";

const  LoginStrategy = ()=>{
        passport.use(local);
        // passport.use(kakao);
        // passport.use(twitter);
        // passport.use(github);
    }

export {LoginStrategy};