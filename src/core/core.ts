import { FileTypes } from './file-types/filetypes.js';
import { DocumentTypeGroups } from './document-type-groups/documenttypegroups.js';
import { DocumentTypes } from './document-types/documenttypes.js';
import { KeywordTypeGroups } from './keyword-type-groups/keywordtypegroups.js';
import { KeywordTypes } from './keyword-types/keywordtypes.js';
import { AutofillKeysets } from './autofill-keysets/autofillkeysets.js';
import { CustomQueries } from './custom-queries/customqueries.js';
import { NoteTypes } from './note-types/notetypes.js';
import { Document } from './document/document.js';

export const core = {
    name: "Document Management API",
    endpoint: "/onbase/core",
    filetypes: FileTypes,
    documenttypegroups: DocumentTypeGroups,
    documenttypes: DocumentTypes,
    keywordtypegroups: KeywordTypeGroups,
    keywordtypes: KeywordTypes,
    autofillkeysets: AutofillKeysets,
    customqueries: CustomQueries,
    notetypes: NoteTypes,
    async getDocument(id: string, getKeywords: boolean, getRevisions: boolean): Promise<any> {
        const data = await Document.get(id, getKeywords, getRevisions);
        return data;
    }
}

