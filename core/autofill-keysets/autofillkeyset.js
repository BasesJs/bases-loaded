const autofillkeysets = require('./autofillkeysets');

class autofillkeyset {
    constructor(item){
        this.id = item.id;
        this.name = item.name;
        this.systemName = item.systemName;
        this.primaryKeywordTypeId = item.primaryKeywordTypeId;
        this.external = item.external;
    }
    id = "";
    name = "";
    systemName = "";
    primaryKeywordTypeId = "";
    external = false;
}

autofillkeyset.prototype.getdata = async (primaryValue) => {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${this.endpoint}/${this.id}/keyword-set-data?primaryValue=${primaryValue}`
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
        
        let items = [];
        response.data.items.forEach(item => {
            let keywords = [];
            //Get keyword by id
            //Create Keyword with value
            items.push(item);
        });       
        return item; 
}

module.exports = autofillkeyset;