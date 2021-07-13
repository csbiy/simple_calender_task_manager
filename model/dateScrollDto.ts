

export class DateScrollDto  {

    private year:number;
    private month:number;
    private lastDayOfMonth:number;
    private direction:string;

    constructor(year:number,month:number,direction:string ){
        this.year = year;
        this.month = month;
        this.direction = direction ; 
    }

    public getLastDayOfMonth() : number {
        return this.lastDayOfMonth;
    }

    public getYear() : number {
        return this.year;
    }
    public getMonth() :number{
        return this.month;
    }
    public getDirection(): string{
        return this.direction;
    }
    public changeMonthByDirection() : void {
        if(this.direction == "right"){
            this.month+=1;
            if(this.month>12){
                this.year+=1;
                this.month=1;
            }
        }
        else{
            this.month-=1;
            if(this.month<1){
                this.year-=1
                this.month=12;
            }
        }
    }

    public setLastDayOfMonth():void{
        const tmp :Date = new Date(this.year,this.month,0);
        
        this.lastDayOfMonth = tmp.getDate();
    }
}

