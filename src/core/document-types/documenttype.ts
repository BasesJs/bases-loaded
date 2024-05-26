import base from '../baseclass/baseclass.js';
import { RequestOptions, RunRequest, httpMethod } from '../../helpers/http/httprequest.js';

export class documenttype extends base{
    constructor(item:any){
        super(item.id, item.name, item.systemName);
        this.defaultFileTypeId = item.defaultFileTypeId;
        this.documentDateDisplayName = item.documentDateDisplayName;
        this.autofillKeywordSetId = item.autofillKeywordSetId;
        this.documentTypeGroupId = item.documentTypeGroupId;
        this.revisionRenditionProperties = item.revisionRenditionProperties;
    }
    defaultFileTypeId:string = "";
    documentDateDisplayName:string = "";
    autofillKeywordSetId:string = "";
    documentTypeGroupId:string = "";
    revisionRenditionProperties = {
        "revisable": false,
        "renditionable": false,
        "commentSettings": {
        "allowComments": false,
        "forceComment": false,
        "firstRevisionNoComment": false
        }
    }   
    async defaultKeywords(){
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${global.bases.core.documenttypes.endpoint}/${this.id}/default-keywords`
        let options = new RequestOptions(
            httpMethod.GET,
            fullUrl,             
            {
                'Content-Type': 'application/json', 
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
            },
            'follow',        
            '');
        const response = await RunRequest(options);   
        return response.data;
    }    
    async keywordTypes(){
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${global.bases.core.documenttypes.endpoint}/${this.id}/keyword-type-groups`
        let options = new RequestOptions(
            httpMethod.GET,
            fullUrl,
            {
                'Content-Type': 'application/json', 
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
            },
            'follow',
            ''
        );
        const response = await RunRequest(options);   
        return response.data;
    }   
}