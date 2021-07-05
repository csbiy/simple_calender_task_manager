
interface DateScrollDto{
    year : number,
    month:number,
    direction:string,
}
function dateScrollDto(year : number,month : number ,direction : string)  {
    this.year = year;
    this.month = month;
    this.direction = direction;
}
/***
 * todo 
 */