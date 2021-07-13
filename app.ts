import * as express from "express";
import * as nunjucks from "nunjucks";
import {DateScrollDto} from "./model/dateScrollDto";
import schedule  from "./router/schedule";
require("dotenv").config();
const app :express.Application =  express();
nunjucks.configure("views",{ 
    autoescape: true,
    express : app
});
app.use(express.urlencoded())
app.use(express.json());
app.use(express.static(__dirname+"/public"));
app.use("/schedule",schedule);
app.use("/member",member);
app.listen( process.env.PORT ,()=>{
    console.log("server executed on" + process.env.PORT);
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
