"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var days = document.querySelectorAll(".day");
var monthBtn = document.querySelectorAll(".month-api");
var currentYear = document.querySelector("#currentYear");
var currentMonth = document.querySelector("#currentMonth");
var month = document.querySelector(".month");
var dayOf4Weeks = 28;
function createDay(day) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("day");
    var p = document.createElement("p");
    p.classList.add("dayTxt");
    var strong = document.createElement("strong");
    strong.textContent = day;
    p.appendChild(strong);
    var div = document.createElement("div");
    var ul = document.createElement("ul");
    ul.classList.add("todoList");
    var li = document.createElement("li");
    li.classList.add("todo");
    ul.appendChild(li);
    div.appendChild(ul);
    wrapper.appendChild(p);
    wrapper.appendChild(div);
    return wrapper;
}
function createLogOutBtn() {
    var li = document.createElement("li");
    var logoutBtn = document.createElement('a');
    li.appendChild(logoutBtn);
    return li;
}
days.forEach(function (day) {
    day.addEventListener("click", function () {
        window.open("../html/schedule.html", "_blank", "width:350,height:500");
    });
});
monthBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var direction = this.firstElementChild.getAttribute("data-direction");
        var axios;
        axios({
            url: '/month',
            method: 'post',
            data: {
                year: currentYear.textContent,
                month: currentMonth.textContent,
                direction: direction,
            }
        })
            .then(function (res) {
            var dateDto = res.data;
            updateMonthAndYear(dateDto);
            var lastWeek = month.lastElementChild;
            var lastDayOfMonth = dateDto.lastDayOfMonth;
            if (lastDayOfMonth > lastWeek.childElementCount + dayOf4Weeks) {
                for (var i = lastWeek.childElementCount + dayOf4Weeks + 1; i < lastDayOfMonth + 1; i++) {
                    lastWeek.appendChild(createDay(i));
                }
            }
            else if (lastDayOfMonth < lastWeek.childElementCount + dayOf4Weeks) {
                for (var i = lastWeek.childElementCount + dayOf4Weeks; i > lastDayOfMonth; i--) {
                    lastWeek.removeChild(lastWeek.lastElementChild);
                }
            }
        })
            .catch(function (err) { if (err)
            throw err; });
    });
});
function updateMonthAndYear(dateDto) {
    currentYear.textContent = "" + dateDto["year"];
    currentMonth.textContent = "" + dateDto["month"];
}
