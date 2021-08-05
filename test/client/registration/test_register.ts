import {InputValidator} from "../../../public/js/registration/inputValidator";
import { ValidationUI } from "../../../public/js/types/validationUI";
import {describe,it,before,beforeEach} from "mocha";
import { strictEqual } from "assert";


describe("test_Register",()=>{

    let msgWrapper :HTMLDivElement;
    before(()=>{
        msgWrapper = document.querySelector("#test");
    })
    beforeEach(()=>{ 
        msgWrapper.classList.remove();
    })
    it("should append valid msg",()=>{
        //given 
        //when
        InputValidator.appendValidMsg(msgWrapper,"유효한 이메일입니다.");
        //then 
        strictEqual(msgWrapper.firstElementChild.classList.contains(ValidationUI.PASS_TEXT_COLOR),true);
    })
    it("should append in-valid msg",()=>{
        //given 
        //when
        InputValidator.appendInValidMsg(msgWrapper,"유효하지 않은 이메일입니다.");
        //then 
        strictEqual(msgWrapper.firstElementChild.classList.contains(ValidationUI.FAIL_TEXT_COLOR),true);
    })
    it("should display valid",()=>{
        InputValidator.displayValid(msgWrapper);
        strictEqual(msgWrapper.classList.contains(ValidationUI.PASS_BORDER_COLOR),true);
    })
    it("should display in-valid",()=>{
        InputValidator.displayInvalid(msgWrapper);
        strictEqual(msgWrapper.classList.contains(ValidationUI.FAIL_BORDER_COLOR),true);
    })

})