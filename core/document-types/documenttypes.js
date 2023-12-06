const { error } = require('console');
const core = require('../core');
const searchparams = require('../utilities/searchparams');
const doctype = require('./documenttype');

const doctypes = {
    endpoint: "/document-types",
    items:  [],
    async get(paramName = null, params = null){
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${this.endpoint}`
        if(paramName != null && params != null){
            let search = new searchparams(paramName, params);
            fullUrl = `${fullUrl}${search.stringify()}`;
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
            let dt = new doctype(item);
            this.items.push(dt);
        });        
        return this.items;
    },
    async getById(id){
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${this.endpoint}/${id}`
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
        let dt = new doctype(response.data);       
        return dt;
    }
}
module.exports = doctypes;
