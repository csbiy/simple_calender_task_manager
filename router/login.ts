import * as express from "express";
import * as passport from "passport";

const router: express.Router = express.Router();

// Passort module은 req 객체에 isAutehnticated method를 추가 
const isLoggedIn  = (req : express.Request,res : express.Response,next:any)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(403).send("login 필요");
    }
}
// login 중이면 isAutehnticated method는 true
const isNotLoggedIn = (req:express.Request , res:express.Response,next:any) =>{
    if(!req.isAuthenticated()){
        const message = encodeURIComponent("login 한 상태입니다.");
        res.redirect(`/?error=${message}`);
    }
}


router.post("/login",isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.log(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`)''
        }
    })
})


router.get("/logout",isLoggedIn,(req,res)=>{
    req.logOut();
    req.session.destroy((err)=>{
        if(err) throw err;
    });
    res.redirect("/");
})



export {isLoggedIn , isNotLoggedIn , router};