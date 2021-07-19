import { UserDto } from "../model/userDto";
import {connectionPool} from "../db/db_config";
import {toMySQLdatetime} from "../DateUtilFunc/time";
const addUser = function(user: UserDto){

    
    const now :Date= new Date();
    connectionPool.query(`insert into user(email,name,password,year,month,day,createdAt) values('${user.email}','${user.name}','${user.password}',${user.year},${user.month},${user.day},'${toMySQLdatetime(now)}')`,(err,res,fields)=>{
            if(err) throw err;
            return
    })
}

const FindByEmail = function(email: string) :Promise<number>{
    return new Promise((resolve,reject)=>{
        connectionPool.query(`select count(*) as emailNum from user where email = '${email}'`,(err,res,fields)=>{
            if(err) throw err;
            return resolve(res[0]["emailNum"]);
        })
    })
}

export {addUser , FindByEmail};

