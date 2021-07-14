
const submitBtn :HTMLElement = document.querySelector("#submitBtn");
const time :NodeList = document.querySelectorAll(".time");
time.forEach((wrapper)=>{
    for (let  i = 0; i<24; i+=0.5){
        let option :any = document.createElement("option")
        option.value = i;
        if(Number.isInteger(i)){
            option.textContent = i + ":00"
        }
        else{
            option.textContent = i + ":30"
        }
        wrapper.appendChild(option)
    }
})
submitBtn.addEventListener("click",()=>window.close());