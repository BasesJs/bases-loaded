process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const config = require('../config/config.json');

class apitask {
    identity = "";
    taskname = "";
    taskid = "";    
    constructor(identity, taskname){
        this.identity = identity;
        this.taskname = taskname;       
    }    
    async run(reqData){
        let data = JSON.stringify(reqData);
        let request = {
            method: 'post',
            url: `${config.environment.baseuri}${config.environment.apibase}/onbase/workflow/api-tasks/${this.taskid}/execute`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${this.identity.token.token_type} ${this.identity.token.access_token}`            
            },      
            redirect: 'follow',
            data : data
        };
        const response = await this.identity.client.request(request);
        return response;
    }
    async getTask(){
        let data = '';
        let request = {
            method: 'get',
            url: `${config.environment.baseuri}${config.environment.apibase}/onbase/workflow/api-tasks`,
            headers: {
                'Authorization': `${this.identity.token.token_type} ${this.identity.token.access_token}`            
            },      
            redirect: 'follow',
            data : data
        };
        const response = await this.identity.client.request(request);
        return response;
    }
}
module.exports = apitask;