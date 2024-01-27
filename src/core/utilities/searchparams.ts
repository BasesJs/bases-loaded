export default class searchparams {
    constructor(paramName:string, parameters:string){
        this.paramname = paramName;
        if(Array.isArray(parameters))
            this.params = parameters
        else{
            this.params = [parameters];
        }
    }
    paramname:string = "";
    params: string[] = [];
    stringify(){
        let str = "?";
        for(let i = 0; i < this.params.length; i++){
            if(i > 0)
                str = `${str}&${this.paramname}=${this.params[i]}`
            else
                str = `${str}${this.paramname}=${this.params[i]}`
        }
        return str;
    }
}