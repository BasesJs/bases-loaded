import { base, _getbyid } from '../baseclass/baseclass.js';
import { DocumentTypes } from './documenttypes.js';
import { RequestOptions, RunRequest, HttpMethod } from '../../http/axios/httprequest.js';

export class DocumentType extends base {
    constructor(id: string, name: string, systemName: string, defaultFileTypeId: string, documentDateDisplayName: string, autofillKeywordSetId: string, documentTypeGroupId: string, revisionRenditionProperties: RevisionRenditionProperties) {
        super(id, name, systemName);
        this.defaultFileTypeId = defaultFileTypeId;
        this.documentDateDisplayName = documentDateDisplayName;
        this.autofillKeywordSetId = autofillKeywordSetId;
        this.documentTypeGroupId = documentTypeGroupId;
        this.revisionRenditionProperties = revisionRenditionProperties;
    }
    defaultFileTypeId: string;
    documentDateDisplayName: string;
    autofillKeywordSetId: string;
    documentTypeGroupId: string;
    revisionRenditionProperties: RevisionRenditionProperties;
    static async parse(item: any) {
        return new DocumentType(item.id, item.name, item.systemName, item.defaultFileTypeId, item.documentDateDisplayName, item.autofillKeywordSetId, item.documentTypeGroupId, RevisionRenditionProperties.parse(item.revisionRenditionProperties));
    }
    static async get(id: string) {
        let response = await _getbyid(id, DocumentTypes.endpoint);
        return DocumentType.parse(response);
    }
    async defaultKeywords() {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${DocumentTypes.endpoint}/${this.id}/default-keywords`
        let options = new RequestOptions(
            HttpMethod.GET,
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
    async keywordTypes() {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${DocumentTypes.endpoint}/${this.id}/keyword-type-groups`
        let options = new RequestOptions(
            HttpMethod.GET,
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
export class RevisionRenditionProperties {
    constructor(revisable: boolean, renditionable: boolean, commentSettings: any) {
        this.revisable = revisable;
        this.renditionable = renditionable;
        this.commentSettings = commentSettings;
    }
    revisable: boolean = false;
    renditionable: boolean = false;
    commentSettings: CommentSettings;
    static parse(item: any) {
        return new RevisionRenditionProperties(item.revisable, item.renditionable, CommentSettings.parse(item.commentSettings));
    }
}
export class CommentSettings {
    constructor(allowComments: boolean, forceComment: boolean, firstRevisionNoComment: boolean) {
        this.allowComments = allowComments;
        this.forceComment = forceComment;
        this.firstRevisionNoComment = firstRevisionNoComment;
    }
    allowComments: boolean;
    forceComment: boolean;
    firstRevisionNoComment: boolean;
    static parse(item: any) {
        return new CommentSettings(item.allowComments, item.forceComment, item.firstRevisionNoComment);
    }
}