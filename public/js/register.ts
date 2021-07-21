
const emailCheckBtn = document.querySelector("#emailCheckBtn") as HTMLButtonElement;
const emailDoman = document.querySelector("#email") as HTMLInputElement;
const emailId = document.querySelector("#emailId") as HTMLInputElement;
const password  = document.querySelector("#password") as HTMLInputElement;
const rePassword  = document.querySelector("#rePassword") as HTMLInputElement;
const submitBtn  = document.querySelector("#submitBtn") as HTMLButtonElement;

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

function isDuplicateEmail(){
    /***
     * todo
     */
    emailCheckBtn.addEventListener("click",()=>{        
        console.log("test")
        axios({
            method: "POST",
            url: "/user/email",
            data:{
                email: `${emailId.value}@${emailDoman.value}`,
            }
        })
            .then((rs)=>{
                if(rs.data['isDuplicate']){
                    emailId.classList.add("is-invalid");
                }
            })
    });
}

isDuplicateEmail();
displayPwStatus();
