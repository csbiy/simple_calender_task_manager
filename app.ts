import * as dotenv          from "dotenv";
import * as express         from "express";
import * as nunjucks        from "nunjucks";
import * as passport        from "passport";
import * as session         from "express-session";
import {DateScrollDto}      from "./model/dateScrollDto";
import schedule             from "./router/schedule";
import user                 from "./router/user"
import {login}              from "./router/auth";
import {passportConfig}     from  "./passport/index";
import   { Strategy as localStrategy }  from "passport-local";
import * as userRepository              from "./repository/userRepository";
import {compareSync}                    from "bcrypt";
import {UserDto}                        from "./model/userDto";


dotenv.config();    
const app :express.Application =  express();

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

passportConfig();
nunjucks.configure("views",{ 
    autoescape: true,
    express : app
});
app.use(express.urlencoded())
app.use(express.json());
app.use(express.static(__dirname+"/public"));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.SECRET_KEY,
    cookie:{
        httpOnly:true,
        secure: false,
    }
}))

app.use("/auth",login);
app.use("/user",user);
app.use("/schedule",schedule);
app.use(passport.initialize());
app.use(passport.session());


app.listen( process.env.PORT ,()=>{
    console.log("server executed on " + process.env.PORT);
})

app.post("/month",( req:express.Request, res: express.Response )=>{
    const dateDto :DateScrollDto = new DateScrollDto(Number(req.body["year"]),Number(req.body["month"]),req.body["direction"])
    dateDto.changeMonthByDirection();
    dateDto.setLastDayOfMonth();
    res.json(dateDto);
})

app.get("/",(req :express.Request,res :express.Response)=>{
    const today: Date = new Date();
    const dateDto :DateScrollDto = new DateScrollDto(today.getFullYear(),today.getMonth()+1,null);
    res.render("index.html",{dateDto : dateDto});
})
