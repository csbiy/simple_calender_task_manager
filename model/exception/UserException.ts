class UserException{

    protected _message : string;
    protected _name : string;
}

class DuplicateEmailException extends UserException{

    constructor(){
        super();
        this._message = "이미 사용중인 이메일입니다."
    }

    toString(){
        return `DuplicateEmailException : ${this._message}`;
    }

}

export {DuplicateEmailException};