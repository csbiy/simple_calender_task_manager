import {cookieUtil,getQueryVariable}                     from "./utilFunction";
import {InputValidator}                                  from "./registration/inputValidator";
import axios,{  AxiosError, AxiosResponse }              from "axios";

const submitBtn          = document.querySelector("#submitBtn") as HTMLButtonElement;
const email              = document.querySelector("#email")     as HTMLInputElement;
const password           = document.querySelector("#password")  as HTMLInputElement;
const msg                = document.querySelector("#msg")       as HTMLDivElement;
const indexBtn           = document.querySelector("#indexBtn")  as HTMLAppletElement;
 
if( "invalid" === getQueryVariable("loginInfo")){
    InputValidator.appendInValidMsg(msg,"아이디 혹은 비밀번호가 틀렸습니다.");
    cookieUtil(`${encodeURIComponent("id")}`,(val:string)=>email.value =decodeURIComponent(val));
}

submitBtn.addEventListener("click",()=>{
        loginRequest()
            .then((res: AxiosResponse)=>{
                const url = res["data"];
                if(url.includes("/auth/login")){
                    document.cookie = `${encodeURIComponent("id")}=${encodeURIComponent(email.value)}; max-age=5;`
                    window.location.href = "/auth/login?loginInfo=invalid";
                }else{
                    indexBtn.click();
                }
            })
            .catch((err :AxiosError)=>{
                if(err) throw err;
            })
    }

)
function loginRequest() {
    return axios({
        method: 'post',
        url: '/auth/login',
        data:{
            email:email.value,
            password:password.value,
        }
    })
}

