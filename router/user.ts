const path = require("path")
import * as express from "express";
import { Router } from "express-serve-static-core";
import { DuplicateEmailException } from "../model/exception/UserException";
import { UserDto } from "../model/userDto";
import * as userService from "../service/userService";
import { isLoggedIn,isNotLoggedIn } from "./auth";

const router : Router= express.Router()


router.get("/",isNotLoggedIn,(req:express.Request , res:express.Response) =>{
    res.render("registration.html");
})

router.post("/email",isNotLoggedIn,(req:express.Request , res: express.Response)=>{;
    userService.isNotDuplicateEmail(req.body["email"])
        .then((isNotDuplicate)=> res.json( {isNotDuplicate : isNotDuplicate} ))
})

router.post("/",isNotLoggedIn,(req:express.Request, res:express.Response) =>{ 
    userService.addUser(new UserDto(req.body));
    res.redirect("/");
})


export default router;