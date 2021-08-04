function cookieUtil(target :string, callback :Function){
    let val = document.cookie.split(";")    
    console.log(val)
    for(let i = 0; i< val.length ; i++){
        let [k,v] = val[i].trim().split("=");
        if(k == target){
            return callback(v);
        }   
    }
}

function getQueryVariable(target :string){
    let url  = window.location.href;
    let idx;
    for( idx = 0 ; idx < url.length ; idx++){
        if(url.charAt(idx) == "?"){
            break;
        }
    }
    let varList = url.substr(idx+1,url.length).split("&");
    for( idx = 0 ; idx < varList.length ; idx++){
        let [k,v] = varList[idx].split("=")
        if(k == target){
            return v;
        }
    }
    return -1;
}

export {cookieUtil,getQueryVariable};