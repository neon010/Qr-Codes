export const scanDataTypes = (data:String):any=>{
    if(isURL(data)){
        const URL = data;
        if(URL && URL.includes("twitter")){
            return {type:"URL", domain:"twitter",logo:"logo-twitter"}
        }else if(URL &&  URL.includes("youtube")){
            return {type:"URL", domain:"youtube",logo:"logo-youtube"}
        }else if(URL &&  URL.includes("facebook")){
            return {type:"URL", domain:"facebook",logo:"logo-facebook"}
        }else{
            return {type:"URL", domain:"URL",logo:"link-outline"}
        }
    }else if(data && isPhoneNumber(data)){
        return {type:"PHONE",logo:"ios-phone-portrait-sharp"}
    }else if(data && isEmail(data)){
        return {type:"EMAIL",logo:"mail-outline"}
    }else{
        return {type:"Text",logo:"md-text-outline"}
    }
}



function isURL(str:any) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}


export function isPhoneNumber(str:any){
    var phoneno = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    
    if(str.match(phoneno)) {
      return true;
    }else {  
      return false;
    }
}

function isEmail(str:any){
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(re.test(str)) return true;
    return false;
}