import {describe,it,before,beforeEach} from "mocha";
import { strictEqual } from "assert";
import {getQueryVariable, cookieUtil} from "../../../public/js/utilFunction";

describe("test_utilFunction",()=>{
    it("should get QueryVariable",(done:any)=>{
        const k1 :string = "test1";
        const v1 :string = "var1";
        const k2 :string = "test2";
        const v2 :string = "var2";  

        if(! window.location.href.includes("?")){
            window.location.href +=`?${k1}=${v1}&${k2}=${v2}`;
        }
        strictEqual(getQueryVariable(k1),v1);
        strictEqual(getQueryVariable(k2),v2);
        done();
    })

    it("should get Cookie and apply function",()=>{
        const k1 :string = "test1";
        const v1 :string = "var1";
        const k2 :string = "test2";
        const v2 :string = "var2";  
        const f = (val:string) => val.length;
        window.document.cookie=`${k1}=${v1}; max-Age=30;` 
        window.document.cookie=`${k2}=${v2}; max-Age=30;`
        strictEqual(cookieUtil(k1,f),v1.length);
        strictEqual(cookieUtil(k2,f),v2.length);
    })

})