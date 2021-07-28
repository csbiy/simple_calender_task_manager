import * as express from "express"
import * as scheduleService from "../service/scheduleService";
import { ScheduleDto } from "../model/scheduleDto";
import { Router } from "express-serve-static-core";
import {isLoggedIn} from "./login";

const router: Router = express.Router();

router.post("/",isLoggedIn,(req : express.Request , res: express.Response)=>{
    let schedule :ScheduleDto  = new ScheduleDto(req.body,false);
    scheduleService.addSchedule(schedule);
})
    

export default router;