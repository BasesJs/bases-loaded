import { base, _getbyid } from '../baseclass/baseclass.js';
import { DocumentTypes } from './documenttypes.js';
import { RequestOptions, RunRequest, HttpMethod, DefaultHeaders } from '../../http/axios/httprequest.js';
import { NewKeywordCollection } from '../keywordcollection/newkeywordcollection.js';

export class DocumentType implements DocumentTypeItem {
    id: string;
    name: string;
    systemName: string;
    defaultFileTypeId: string;
    documentDateDisplayName: string;
    autofillKeywordSetId: string;
    documentTypeGroupId: string;
    revisionRenditionProperties: RevisionRenditionProperties;

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

    static async get(id: string | number): Promise<DocumentType | null> {
        try {
            const response = await _getbyid(DocumentTypes.endpoint, id);
            return DocumentType.parse(response);
        } catch (error) {
            console.error(`Failed to get DocumentType with id ${id}:`, error);
            return null;
        }
    }

    async keywordTypes() : Promise<NewKeywordCollection | null> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${DocumentTypes.endpoint}/${this.id}/default-keywords`;
        const options = new RequestOptions(HttpMethod.GET, fullUrl, DefaultHeaders('application/json'),'');

        try {
            const response = await RunRequest(options);
            return NewKeywordCollection.parse(response.data);
        } catch (error) {
            console.error('Error fetching default keywords:', error);
            throw error;
        }
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