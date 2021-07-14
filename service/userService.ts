import * as bcrypt from "bcrypt"
import {UserDto} from "../model/userDto";
import * as userRepository from "../repository/userRepository";

const addUser = async function(user : UserDto){
    await encryptPassword(user);
    userRepository.addUser(user);  
}

async function encryptPassword(user: UserDto) {
    const encryptedPw: string = await bcrypt.hash(user.password, 12);
    user.password = encryptedPw;
}


export {addUser}

