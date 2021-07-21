
submitBtn = document.querySelector("#submitBtn");
time = document.querySelectorAll(".time");
time.forEach((wrapper)=>{
    for (let  i = 0; i<24; i+=0.5){
        option = document.createElement("option")
        option.value = i;
        if(Number.isInteger(i)){
            option.textContent = parseInt(i) + ":00"
        }
        else{
            option.textContent = parseInt(i) + ":30"
        }
        wrapper.appendChild(option)
    }
})

submitBtn.addEventListener("click",()=>window.close());

