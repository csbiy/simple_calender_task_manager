
const days = document.querySelectorAll(".day");
const monthBtn = document.querySelectorAll(".month-api");
const currentYear = document.querySelector("#currentYear");
const currentMonth = document.querySelector("#currentMonth");

monthBtn.forEach((btn) =>{ 
        btn.addEventListener("click",function(){

            btn = this;
            const direction = btn.firstElementChild.getAttribute("data-direction");
            axios.post("/month",{
                year: currentYear.textContent,
                month: currentMonth.textContent,
                direction : direction,
                Headers: {
                    "Content-Type" : "application/json"
                } 
            })
                .then((res) =>console.log(res))
                .catch((err) => {if(err) throw err})
        })
    }
)