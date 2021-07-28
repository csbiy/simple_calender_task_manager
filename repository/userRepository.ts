import { UserDto } from "../model/userDto";
import {connectionPool} from "../db/db_config";
import {toMySQLdatetime} from "../DateUtilFunc/time";
import { rejects } from "assert";


const addUser = function(user: UserDto) :Promise<boolean> {
    const now :Date= new Date();
    return new Promise((resolve,reject) => {
        let insertQuery;
        if(user.year && user.month && user.day){
            insertQuery = `insert into user(email,name,password,year,month,day,createdAt) values('${user.email}','${user.name}','${user.password}',${user.year},${user.month},${user.day},'${toMySQLdatetime(now)}')`;
        }else{
            insertQuery = `insert into user(email,name,password,createdAt) values('${user.email}','${user.name}','${user.password}','${toMySQLdatetime(now)}')`;
        }
        connectionPool.query(insertQuery,(err,res,fields)=>{
            if(err) throw err;
            return resolve(true);
        })
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

