"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateScrollDto_1 = require("./../../model/dateScrollDto");
var days = document.querySelectorAll(".day");
var monthBtn = document.querySelectorAll(".month-api");
var currentYear = document.querySelector("#currentYear");
var currentMonth = document.querySelector("#currentMonth");
var month = document.querySelector(".month");
var dayOf4Weeks = 28;
setUpCurrentDate();
days.forEach(function (day) {
    day.addEventListener("click", function () {
        window.open("../html/schedule.html", "_blank", "width:350,height:500");
    });
});
monthBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var direction = this.firstElementChild.getAttribute("data-direction");
        var dateDto = new dateScrollDto_1.DateScrollDto(Number(currentYear.textContent), Number(currentMonth.textContent), direction);
        dateDto.changeMonthByDirection();
        dateDto.setLastDayOfMonth();
        updateMonthAndYear(dateDto);
        currentYear.textContent = dateDto.year.toString();
        currentMonth.textContent = dateDto.month.toString();
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
    });
});
function updateMonthAndYear(dateDto) {
    currentYear.textContent = "" + dateDto["year"];
    currentMonth.textContent = "" + dateDto["month"];
}
function setUpCurrentDate() {
    var currDate = new Date();
    currentYear.textContent = currDate.getFullYear().toString();
    currentMonth.textContent = (currDate.getMonth() + 1).toString();
}
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
