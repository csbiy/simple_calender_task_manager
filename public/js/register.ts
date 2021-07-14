
const password: HTMLElement = document.querySelector("#password");
const rePassword: HTMLElement = document.querySelector("#rePassword");
const submitBtn :HTMLElement = document.querySelector("#submitBtn");
/***
 * problem in logic 
 */
function isSamePassword(pw1: HTMLElement ,pw2:HTMLElement) : boolean{
    console.log(pw1.innerText);
    console.log(pw1.innerHTML);
    console.log(pw1.textContent);
    console.log(pw1.nodeValue);

    return pw1.innerHTML == pw2.innerText;
}
function displayPwStatus() : void{
    rePassword.addEventListener("keyup",()=>{
        if(isSamePassword(password,rePassword)){
            submitBtn.setAttribute("type","button");
            rePassword.classList.remove("is-invalid");
            rePassword.classList.add("is-valid");
        }
        else{
            submitBtn.setAttribute("type","submit");
            rePassword.classList.remove("is-valid");
            rePassword.classList.add("is-invalid");
        }    
})};



displayPwStatus();
