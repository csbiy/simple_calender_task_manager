import * as express from "express"
import * as scheduleService from "../service/scheduleService";
import { ScheduleDto } from "../model/scheduleDto";
const router = express.Router();
router.post("/",(req : express.Request , res: express.Response)=>{
    let schedule :ScheduleDto  = new ScheduleDto(req.body,false);
    scheduleService.addSchedule(schedule);
})
    

export default router;