const days = document.querySelectorAll(".day");
const monthBtn = document.querySelectorAll(".month-api");
const currentYear = document.querySelector("#currentYear");
const currentMonth = document.querySelector("#currentMonth");
const month = document.querySelector(".month");
const dayOf4Weeks = 28;
// <div class="day">
// <p class="dayTxt"><strong>{{ i }}</strong></p>
// <div>
//     <ul class="todoList">
//         <li class="todo"></li>
//     </ul>
// </div>
// </div>
function createDay(dayNum){
    wrapper = document.createElement("div");
    wrapper.classList.add("day");
    
    p =  document.createElement("p");
    p.classList.add("dayTxt");
    strong = document.createElement("strong");
    strong.textContent = dayNum;
    p.appendChild(strong);
    
    div = document.createElement("div");
    ul = document.createElement("ul")
    ul.classList.add("todoList");
    li = document.createElement("li");
    li.classList.add("todo");
    ul.appendChild(li);
    div.appendChild(ul);

    wrapper.appendChild(p);
    wrapper.appendChild(div);
    return wrapper;
}

monthBtn.forEach((btn) =>{ 
        btn.addEventListener("click",function(){
            const direction = this.firstElementChild.getAttribute("data-direction");
            axios.post("/month",{
                year: currentYear.textContent,
                month: currentMonth.textContent,
                direction : direction,
            })
                .then((res) => {
                    dateDto = res.data;
                    updateMonthAndYear(dateDto);
                    lastWeek = month.lastElementChild;
                    lastDayOfMonth  = dateDto.lastDayOfMonth;
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

function updateMonthAndYear(dateDto) {
    currentYear.textContent = dateDto["year"];
    currentMonth.textContent = dateDto["month"];
}

