const core = require('../core');
const filetype = require('./filetype');

const filetypes = {
    endpoint: "/file-types",
    items:  [],
    async get(){
        let data = "";
        let request = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${global.bases.apiURI}${core.endpoint}${this.endpoint}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`            
            },      
            redirect: 'follow',
            data : data
        };
        const response = await global.bases.client.request(request);
        response.data.items.forEach(item => {
            item = new filetype(item.id, item.name, item.systemName);
            this.items.push(item);
        });        
        return this.items;
    }
}
module.exports = filetypes;
