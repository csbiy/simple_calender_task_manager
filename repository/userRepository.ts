import { UserDto } from "../model/userDto";
import {connectionPool} from "../db/db_config";
const addUser = function(user: UserDto){
    
    connectionPool.query(`insert into user(email,name,password,year,month,day,createdAt,updatedAt) values(${user.email})`)

}

export {addUser};

