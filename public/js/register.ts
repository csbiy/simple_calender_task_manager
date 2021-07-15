
const password  = document.querySelector("#password") as HTMLInputElement;
const rePassword  = document.querySelector("#rePassword") as HTMLInputElement;
const submitBtn  = document.querySelector("#submitBtn") as HTMLButtonElement;
/***
 * problem in logic 
 */
function isSamePassword(pw1: HTMLInputElement ,pw2:HTMLInputElement) : boolean{
    return pw1.value == pw2.value;
}
function displayPwStatus() : void{
    rePassword.addEventListener("keyup",()=>{
        if(isSamePassword(password,rePassword)){
            submitBtn.setAttribute("type","submit");
            rePassword.classList.remove("is-invalid");
            rePassword.classList.add("is-valid");
        }
        else{
            submitBtn.setAttribute("type","button");
            rePassword.classList.remove("is-valid");
            rePassword.classList.add("is-invalid");
        }    
})};



displayPwStatus();
