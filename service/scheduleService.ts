import { ScheduleDto } from "../model/scheduleDto"
import * as ScheduleRepository from "../repository/scheduleRepository"

const addSchedule = function(scheduleDto : ScheduleDto) : void{
    ScheduleRepository.addSchedule(scheduleDto);   
}

export {addSchedule}