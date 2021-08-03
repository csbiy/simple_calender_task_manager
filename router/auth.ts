import * as express from "express";
import {resolve} from "path"
import * as passport from "passport";

const router: express.Router = express.Router();

// Passort module은 req 객체에 isAutehnticated method를 추가 
const isLoggedIn  = (req : express.Request,res : express.Response,next:express.NextFunction)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(403).send("login 필요");
    }
}
// login 중이면 isAutehnticated method는 true
const isNotLoggedIn = (req:express.Request , res:express.Response,next:express.NextFunction) =>{
    if(req.isAuthenticated()){
        const message = encodeURIComponent("login 한 상태입니다.");
        res.redirect(`/?error=${message}`);
    }
    next();
}

router.get("/login",isNotLoggedIn,(req :express.Request ,res:express.Response,next:express.NextFunction)=>{
    console.log("request")
    res.sendFile(resolve(__dirname+"/../public/html/login.html"));
})

router.post("/login",isNotLoggedIn,(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    // passport.authenticate middleware가 로그인 전략 수행 
    // middleware인데, router middleware안에 들어가 있음 , 사용자 정의 기능추가할떄 이렇게 가능 
    // 전략 성공,실패시 call back 함수 실행 
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.log(authError);
            return next(authError);
        }
        if(!user){
            return res.json('/auth/login');
        }
        return req.login(user,(loginError)=>{
            if(loginError){
                console.log(loginError);
                return next(loginError);
            }
            return res.json("/");
        })
        // middleware내 middleware에는 (req,res,next)를 붙인다.
    })(req,res,next);
})


router.get("/logout",isLoggedIn,(req,res)=>{
    req.logOut();
    req.session.destroy((err)=>{
        if(err) throw err;
    });
    res.redirect("/");
})



export {isLoggedIn , isNotLoggedIn , router as login};