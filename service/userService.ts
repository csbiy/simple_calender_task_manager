import * as bcrypt from "bcrypt"
import {UserDto} from "../model/userDto";
import * as userRepository from "../repository/userRepository";

const addUser = async function(user : UserDto) :Promise<boolean>{
        return userRepository.addUser(user);
}

async function encryptPassword(user: UserDto) {
    const encryptedPw: string = await bcrypt.hash(user.password, 12);
    user.password = encryptedPw;
}

const isNotDuplicateEmail = async function(userEmail :string ) :Promise<boolean>{
    const foundEmail :number = await userRepository.FindByEmail(userEmail);
    if(foundEmail >= 2){
        return false;
    }
    return true;
}

export {addUser , isNotDuplicateEmail, encryptPassword };
