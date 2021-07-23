
import {ValidationUI} from "../types/validationUI"

class InputValidator{
    
    constructor(){
    }
    public static removeMsgIfExist(dom :HTMLDivElement) :void{
        let msg :ChildNode = dom.firstChild 
        if(msg){
            msg.remove();
        }
    }
    public static appendValidMsg(dom :HTMLDivElement ,text :string) :void{
        this.removeMsgIfExist(dom);
        const p :HTMLParagraphElement = document.createElement('p'); 
        p.classList.add(ValidationUI.PASS_TEXT_COLOR);
        p.textContent = text;
        dom.appendChild(p);
    }
    public static appendInValidMsg(dom :HTMLDivElement,text :string) :void{
        this.removeMsgIfExist(dom);
        const p = document.createElement('p'); 
        p.classList.add(ValidationUI.FAIL_TEXT_COLOR);
        p.textContent = text;
        dom.appendChild(p);
    }
    public static displayInvalid(dom : HTMLDivElement) :void{
        dom.classList.remove(ValidationUI.PASS_BORDER_COLOR);
        dom.classList.add(ValidationUI.FAIL_BORDER_COLOR);
    }
    public static displayValid(dom :HTMLDivElement) :void{
        dom.classList.remove(ValidationUI.FAIL_BORDER_COLOR);
        dom.classList.add(ValidationUI.PASS_BORDER_COLOR);
    }
    
}

export  {InputValidator};