const { error } = require('console');
const core = require('../core');
const searchparams = require('../utilities/searchparams');
const customquerie = require('./customquerie');

const customqueries = {
    endpoint: "/custom-queries",
    items:  [],
    async get(paramName = null, params = null){
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${this.endpoint}`
        if(paramName != null && params != null){
            let search = new searchparams(paramName, params);
            fullUrl = `${fullUrl}${search.stringify()}`;
            console.log(fullUrl);
        }
        else if((paramName != null && params == null) || (paramName == null && params != null) ){
            throw error("When using search parameters, both variables are required.");
        }

        let data = "";
        let request = {
            method: 'get',
            maxBodyLength: Infinity,
            url: fullUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`            
            },      
            redirect: 'follow',
            data : data
        };
        const response = await global.bases.client.request(request);
        response.data.items.forEach(item => {
            let cq = new customquerie(item);
            this.items.push(cq);
        });        
        return this.items;
    }
}
module.exports = customqueries;
