import { base, _getbyid } from '../baseclass/baseclass.js';
import { documenttypes } from './documenttypes.js';
import { RequestOptions, RunRequest, httpMethod } from '../../helpers/http/httprequest.js';
export class documenttype extends base {
    constructor(id, name, systemName, defaultFileTypeId, documentDateDisplayName, autofillKeywordSetId, documentTypeGroupId, revisionRenditionProperties) {
        super(id, name, systemName);
        this.defaultFileTypeId = defaultFileTypeId;
        this.documentDateDisplayName = documentDateDisplayName;
        this.autofillKeywordSetId = autofillKeywordSetId;
        this.documentTypeGroupId = documentTypeGroupId;
        this.revisionRenditionProperties = revisionRenditionProperties;
    }
    defaultFileTypeId;
    documentDateDisplayName;
    autofillKeywordSetId;
    documentTypeGroupId;
    revisionRenditionProperties;
    static async parse(item) {
        return new documenttype(item.id, item.name, item.systemName, item.defaultFileTypeId, item.documentDateDisplayName, item.autofillKeywordSetId, item.documentTypeGroupId, revisionRenditionProperties.parse(item.revisionRenditionProperties));
    }
    static async get(id) {
        let response = await _getbyid(id, documenttypes.endpoint);
        return documenttype.parse(response);
    }
    async defaultKeywords() {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${global.bases.core.documenttypes.endpoint}/${this.id}/default-keywords`;
        let options = new RequestOptions(httpMethod.GET, fullUrl, {
            'Content-Type': 'application/json',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        }, 'follow', '');
        const response = await RunRequest(options);
        return response.data;
    }
    async keywordTypes() {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${global.bases.core.documenttypes.endpoint}/${this.id}/keyword-type-groups`;
        let options = new RequestOptions(httpMethod.GET, fullUrl, {
            'Content-Type': 'application/json',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        }, 'follow', '');
        const response = await RunRequest(options);
        return response.data;
    }
}
export class revisionRenditionProperties {
    constructor(revisable, renditionable, commentSettings) {
        this.revisable = revisable;
        this.renditionable = renditionable;
        this.commentSettings = commentSettings;
    }
    revisable = false;
    renditionable = false;
    commentSettings;
    static parse(item) {
        return new revisionRenditionProperties(item.revisable, item.renditionable, commentSettings.parse(item.commentSettings));
    }
}
export class commentSettings {
    constructor(allowComments, forceComment, firstRevisionNoComment) {
        this.allowComments = allowComments;
        this.forceComment = forceComment;
        this.firstRevisionNoComment = firstRevisionNoComment;
    }
    allowComments;
    forceComment;
    firstRevisionNoComment;
    static parse(item) {
        return new commentSettings(item.allowComments, item.forceComment, item.firstRevisionNoComment);
    }
}
