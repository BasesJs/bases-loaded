import {  _getbyid } from '../baseclass/baseclass.js';
import { DocumentTypes } from './documenttypes.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
import { RunRequest } from '../../http/httprequest.js';
import { DocumentKeywordTypes } from '../keywordcollection/keywordtypecollection.js';

export class DocumentType implements DocumentTypeItem {
    id: string;
    name: string;
    systemName: string;
    defaultFileTypeId: string;
    documentDateDisplayName: string;
    autofillKeywordSetId: string;
    documentTypeGroupId: string;
    revisionRenditionProperties: RevisionRenditionProperties;
    documentKeywordTypes?: DocumentKeywordTypes;

    constructor(
        id: string,
        name: string,
        systemName: string,
        defaultFileTypeId: string,
        documentDateDisplayName: string,
        autofillKeywordSetId: string,
        documentTypeGroupId: string,
        revisionRenditionProperties: RevisionRenditionProperties
    ) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.defaultFileTypeId = defaultFileTypeId;
        this.documentDateDisplayName = documentDateDisplayName;
        this.autofillKeywordSetId = autofillKeywordSetId;
        this.documentTypeGroupId = documentTypeGroupId;
        this.revisionRenditionProperties = revisionRenditionProperties;
    }

    static parse(item: DocumentTypeItem): DocumentType {
        return new DocumentType(
            item.id,
            item.name,
            item.systemName,
            item.defaultFileTypeId,
            item.documentDateDisplayName,
            item.autofillKeywordSetId,
            item.documentTypeGroupId,
            RevisionRenditionProperties.parse(item.revisionRenditionProperties)
        );
    }

    static async get(id: string | number): Promise<DocumentType> {
        const response = await _getbyid(DocumentTypes.endpoint, id);
        return DocumentType.parse(response.data);
    }

    async keywordTypes() : Promise<DocumentKeywordTypes> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${DocumentTypes.endpoint}/${this.id}/default-keywords`;
        const options = new RequestOptions({url: fullUrl, method: HttpMethod.GET});
        const response = await RunRequest(options);
        this.documentKeywordTypes = DocumentKeywordTypes.parse(response.data);
        return this.documentKeywordTypes;
    }    
}

export class RevisionRenditionProperties {
    revisable: boolean;
    renditionable: boolean;
    commentSettings: CommentSettings;

    constructor(revisable: boolean, renditionable: boolean, commentSettings: CommentSettings) {
        this.revisable = revisable;
        this.renditionable = renditionable;
        this.commentSettings = commentSettings;
    }

    static parse(item: RevisionRenditionPropertiesItem): RevisionRenditionProperties {
        return new RevisionRenditionProperties(item.revisable, item.renditionable, CommentSettings.parse(item.commentSettings));
    }
}

export class CommentSettings {
    allowComments: boolean;
    forceComment: boolean;
    firstRevisionNoComment: boolean;

    constructor(allowComments: boolean, forceComment: boolean, firstRevisionNoComment: boolean) {
        this.allowComments = allowComments;
        this.forceComment = forceComment;
        this.firstRevisionNoComment = firstRevisionNoComment;
    }

    static parse(item: CommentSettingsItem): CommentSettings {
        return new CommentSettings(item.allowComments, item.forceComment, item.firstRevisionNoComment);
    }
}
export interface DocumentTypeItem {
    id: string;
    name: string;
    systemName: string;
    defaultFileTypeId: string;
    documentDateDisplayName: string;
    autofillKeywordSetId: string;
    documentTypeGroupId: string;
    revisionRenditionProperties: RevisionRenditionPropertiesItem; // Type appropriately if known
}

interface CommentSettingsItem {
    allowComments: boolean;
    forceComment: boolean;
    firstRevisionNoComment: boolean;
}

interface RevisionRenditionPropertiesItem {
    revisable: boolean;
    renditionable: boolean;
    commentSettings: CommentSettingsItem;
}