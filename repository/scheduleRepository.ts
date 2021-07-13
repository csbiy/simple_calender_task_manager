import { connectionPool } from "../db/db_config";
import { ScheduleDto } from "../model/scheduleDto";
import {toMySQLdatetime} from "../DateUtilFunc/time";
const fromIndex  : number= 0;
const toIndex : number =1;

const addSchedule = function(scheduleDto : ScheduleDto) : void{
    connectionPool.getConnection((err,conn)=>{
        if(err) throw err;
        conn.query(`insert into schedule(id,year,month,day,from,to,createdAt,user_id) values(
            ${scheduleDto.date.getFullYear()},
            ${+scheduleDto.date.getMonth+1},
            ${scheduleDto.date.getDate()},
            ${scheduleDto.timeLine[fromIndex]},
            ${scheduleDto.timeLine[toIndex]},
            ${toMySQLdatetime(scheduleDto.createdAt)},
            ${1}//getUser}
            )`,(err,res,fields)=>{
                conn.release();
                if(err) throw err;
                }
            )
        })
}

export {addSchedule};
