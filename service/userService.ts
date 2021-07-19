import * as bcrypt from "bcrypt"
import {UserDto} from "../model/userDto";
import * as userRepository from "../repository/userRepository";
import { DuplicateEmailException } from "../model/exception/UserException";

const addUser = async function(user : UserDto) :Promise<DuplicateEmailException | undefined> {
    const isDuplicateEmail :boolean= await isNotDuplicateEmail(user.email);
    if(isDuplicateEmail){
        await encryptPassword(user);
        return userRepository.addUser(user);
    }
    return new DuplicateEmailException();
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
