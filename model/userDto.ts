
export class UserDto{

    private _email: string;
    private _name : string;
    private _password : string;
    private _year:number;
    private _month:number;
    private _day:number;

    constructor(requestBody : {emailId : string, email:string ,name : string, password : string , year:number, month:number,day:number;
    }){
        this._email = requestBody['emailId'] + requestBody['email'];
        this._name = requestBody['name'];
        this._password = requestBody['password'];
        this._year = requestBody['year'];
        this._month = requestBody['month'];
        this._day = requestBody['day'];   
    }
    toString(){
        return `User( name:${this._name} / birth:${this._year + "/" + this._month + "/" + this._day})`;
    }
    get email(){
        return this._email;
    }
    get name(){
        return this._name;
    }
    get password(){
        return this._password;
    }
    set password( encryptedPw :string){
        this._password =  encryptedPw;
    }
    get year(){
        return this._year;
    }
    get month(){
        return this._month;
    }
    get day(){
        return this._day;
    }

}