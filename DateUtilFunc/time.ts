function getTime(date: Date) : string{
   return  `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
}

function toMySQLdatetime(date: Date):string {
   return date.toISOString().slice(0, 19).replace('T', ' ');
}

export {getTime,toMySQLdatetime}