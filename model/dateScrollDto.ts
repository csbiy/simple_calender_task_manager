import { Direction } from "./enum/Direction";


export class DateScrollDto  {

    private _year:number;
    private _month:number;
    private _lastDayOfMonth:number;
    private _direction:Direction;

    constructor(year:number,month:number,direction:string ){
        this._year = year;
        this._month = month;
        if(direction==Direction.left){
            this._direction = Direction.left;
        }else{
            this._direction = Direction.right;
        }
    }

    get lastDayOfMonth() : number {
        return this._lastDayOfMonth;
    }

    get year() : number {
        return this._year;
    }
    get month() :number{
        return this._month;
    }
    get direction(): string{
        return this._direction;
    }
    public changeMonthByDirection() : void {
        if(this._direction == Direction.right){
            this._month+=1;
            if(this._month>12){
                this._year+=1;
                this._month=1;
            }
        }
        else if(this.direction ==  Direction.left){
            this._month-=1;
            if(this._month<1){
                this._year-=1
                this._month=12;
            }
        }
    }

    public setLastDayOfMonth():void{
        const tmp :Date = new Date(this.year,this.month,0);
        this._lastDayOfMonth = tmp.getDate();
    }
}

