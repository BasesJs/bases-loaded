export class SearchParams {
    paramname: string;
    params: string[];

    constructor(paramName: string, parameters: string | string[]) {
        this.paramname = paramName;
        this.params = Array.isArray(parameters) ? parameters : [parameters];
    }

    stringify(): string {
        return this.params.map((param, i) => `${i === 0 ? '?' : '&'}${this.paramname}=${param}`).join('');
    }

    static create(value: any): SearchParams {
        
        if(isNaN(Number(value))){
            return new SearchParams("systemName", value); 
        }
        else{
            return new SearchParams("id", value);
        }
    }
}