import type {ScheduleType} from "../model/enum/ScheduleType";
import {getTime} from "../DateUtilFunc/time";

export class ScheduleDto{
    private _date: Date;
    private _title : string;
    private _content : string;
    private _timeLine: Array<number>;
    private _type: ScheduleType;
    private _createdAt: Date | null;
    private _updatedAt: Date | null;
    constructor(requestBody:{year:number,month:number,day:number, title : string,content : string,from : number,to :number,type : ScheduleType ,},isUpdate: boolean){

        this._date = new Date(requestBody['year'],requestBody['month'],requestBody['day']);
        this._title = requestBody['title'];
        this._content = requestBody['content'];
        this._timeLine.push(requestBody['from']);
        this._timeLine.push(requestBody['to']);
        this._type = requestBody['type'];
        if(isUpdate){
            this._updatedAt = new Date();
        }else{
            this._createdAt = new Date();
        }
    }
    get title():string{
        return this._title;
    }
    get content():string{
        return this._content;
    }
    get type(): ScheduleType{
        return this._type;
    }
    get createdAt():Date{
        return this._createdAt;
    }
    get updatedAt():Date{
        return this._updatedAt;
    }
    get timeLine():Array<number>{
        return this.timeLine;
    } 
    get date(): Date{
        return this._date
    }
}