import * as dotenv                      from "dotenv";
import * as express                     from "express";
import * as nunjucks                    from "nunjucks";
import * as passport                    from "passport";
import * as session                     from "express-session";
import {DateScrollDto}                  from "./model/dateScrollDto";
import schedule                         from "./router/schedule";
import user                             from "./router/user"
import {login}                          from "./router/auth";
import {passportConfig}                 from  "./passport/index";
import {LoginStrategy}                  from "./passport/loginStrategyContainer"
import { UserDto }                      from "./model/userDto";

dotenv.config();    
const app :express.Application =  express();
// passportStrategy();
LoginStrategy();

passportConfig();
nunjucks.configure("views",{ 
    autoescape: true,
    express : app
});
app.use(express.urlencoded())
app.use(express.json());
app.use(express.static(__dirname+"/public"));
app.use(session({
    name: "connection.sid",
    resave:false,
    saveUninitialized:false,
    secret:process.env.SECRET_KEY,
    cookie:{
        httpOnly:true,
        secure: false,
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth",login);
app.use("/user",user);
app.use("/schedule",schedule);


app.listen( process.env.PORT ,()=>{
    console.log("server executed on " + process.env.PORT);
})

app.get("/",(req :express.Request,res :express.Response)=>{
    const today: Date = new Date();
    const dateDto :DateScrollDto = new DateScrollDto(today.getFullYear(),today.getMonth()+1,null);
    let user = req.user as UserDto
    if(user){
        res.render("index.html",{dateDto : dateDto, isLogin :req.isAuthenticated(),name:user.name});
        
    }else{
        res.render("index.html",{dateDto : dateDto, isLogin :req.isAuthenticated()});
    }
})

// error handler 
app.use((err:any,req:express.Request,res:express.Response,next:express.NextFunction)=>{
    console.log(err);
    res.status(500).send(err)
})


export {app};