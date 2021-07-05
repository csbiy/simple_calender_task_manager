import * as express from "express";
import * as nunjucks from "nunjucks";
const app :express.Application =  express();

nunjucks.configure("views",{ 
    autoescape: true,
    express : app
});
app.use(express.static(__dirname+"/public"));
app.listen( process.env.port || 3000 ,()=>{
    console.log("server executed ");
})


app.post("/month",( req:express.Request, res: express.Response )=>{

    console.log(req);
     
})

app.get("/",(req :express.Request,res :express.Response)=>{
    const lastDayOfMonth: Date = getLastDayOfMonth();
    res.render("index.html",{lastDayOfMonth : lastDayOfMonth});
})

function getLastDayOfMonth() :Date {
    const today: Date = new Date();
    const lastDayOfMonth: Date = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDayOfMonth;
}
