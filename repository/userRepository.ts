import { UserDto } from "../model/userDto";
import {connectionPool} from "../db/db_config";
import {toMySQLdatetime} from "../DateUtilFunc/time";
const addUser = function(user: UserDto){
    const now :Date= new Date();
    connectionPool.query(`insert into user(email,name,password,year,month,day,createdAt) values('${user.email}','${user.name}','${user.password}',${user.year},${user.month},${user.day},'${toMySQLdatetime(now)}')`,(err,res,fields)=>{
            if(err) throw err;
            console.log(res);
    })

}

export {addUser};

