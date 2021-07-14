import {  AxiosInstance } from "axios";

const days :NodeList = document.querySelectorAll(".day");
const monthBtn :NodeList = document.querySelectorAll(".month-api");
const currentYear  : HTMLElement= document.querySelector("#currentYear");
const currentMonth :HTMLElement = document.querySelector("#currentMonth");
const month :HTMLElement = document.querySelector(".month");
const dayOf4Weeks :number = 28;

interface DateScrollInfo{
    year: number,
    month: number,
    direction: string,
    lastDayOfMonth:number,
}


function createDay(day : number) : HTMLElement{
    let wrapper :HTMLElement = document.createElement("div");
    wrapper.classList.add("day");
    let p : HTMLElement =  document.createElement("p");
    p.classList.add("dayTxt");
    let strong :HTMLElement | any = document.createElement("strong");
    strong.textContent = day;
    p.appendChild(strong);
    
    let div :HTMLElement = document.createElement("div");
    let ul : HTMLElement = document.createElement("ul")
    ul.classList.add("todoList");
    let li : HTMLElement = document.createElement("li");
    li.classList.add("todo");
    ul.appendChild(li);
    div.appendChild(ul);
    wrapper.appendChild(p);
    wrapper.appendChild(div);
    return wrapper;
}

days.forEach((day)=>{
    day.addEventListener("click",function(){
        window.open("../html/schedule.html","_blank","width:350,height:500")
    })
})

monthBtn.forEach((btn) =>{ 
        btn.addEventListener("click",function(){
            const direction = this.firstElementChild.getAttribute("data-direction");
            
            let axios :AxiosInstance;
            axios({
                url:'/month',
                method: 'post',
                data:{
                    year: currentYear.textContent ,
                    month: currentMonth.textContent,
                    direction : direction,
                }
            })
                .then((res) => {
                    const dateDto :DateScrollInfo = res.data;
                    updateMonthAndYear(dateDto);
                    let lastWeek :Element = month.lastElementChild;
                    let lastDayOfMonth :number = dateDto.lastDayOfMonth;
                    if(lastDayOfMonth > lastWeek.childElementCount + dayOf4Weeks ){
                        for(let i = lastWeek.childElementCount + dayOf4Weeks +1 ;  i < lastDayOfMonth +1 ; i ++){
                           lastWeek.appendChild(createDay(i));
                       }
                    }
                    else if(lastDayOfMonth < lastWeek.childElementCount + dayOf4Weeks ){
                        for(let i = lastWeek.childElementCount + dayOf4Weeks  ;  i > lastDayOfMonth  ; i --){
                            lastWeek.removeChild(lastWeek.lastElementChild);
                     }
                    }
                })
                .catch((err) => {if(err) throw err})
        })
    }
)

function updateMonthAndYear(dateDto :DateScrollInfo) {
    currentYear.textContent = ""+dateDto["year"];
    currentMonth.textContent = ""+ dateDto["month"];
}