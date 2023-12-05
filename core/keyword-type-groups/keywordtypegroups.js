const core = require('../core');
const keytypegroup = require('./keywordtypegroup');
const searchparams = require('../utilities/searchparams');

const keytypegroups = {
    endpoint: "/keyword-type-groups",
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
            let ktg = new keytypegroup(item);
            this.items.push(ktg);
        });        
        return this.items;
    }
}
module.exports = keytypegroups;
