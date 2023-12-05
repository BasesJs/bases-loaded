const doctypes = require('./documenttypes');
const core = require('../core');
class doctype {
    constructor(item){
        this.id = item.id;
        this.name = item.name;
        this.systemName = item.systemName;
        this.defaultFileTypeId = item.defaultFileTypeId;
        this.documentDateDisplayName = item.documentDateDisplayName;
        this.autofillKeywordSetId = item.autofillKeywordSetId;
        this.documentTypeGroupId = item.documentTypeGroupId;
        this.revisionRenditionProperties = item.revisionRenditionProperties;
    }
    id = "";
    name = "";
    systemName = "";
    defaultFileTypeId = "";
    documentDateDisplayName = "";
    autofillKeywordSetId = "";
    documentTypeGroupId = "";
    revisionRenditionProperties = {
        "revisable": true,
        "renditionable": true,
        "commentSettings": {
        "allowComments": true,
        "forceComment": true,
        "firstRevisionNoComment": true
        }
    }   
    async defaultKeywords(){
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${global.bases.core.doctypes.endpoint}/${this.id}/default-keywords`
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
        const response =  await global.bases.client.request(request);
        return response.data;
    }    
    async keywordTypes(){
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${global.bases.core.doctypes.endpoint}/${this.id}/keyword-type-groups`
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
        const response =  await global.bases.client.request(request);
        return response.data;
    }   
}
module.exports = doctype;
