import { filetypes } from './file-types/filetypes.js';
import { documenttypegroups } from './document-type-groups/documenttypegroups.js';
import { documenttypes } from './document-types/documenttypes.js';
import { keywordtypegroups } from './keyword-type-groups/keywordtypegroups.js';
import { keywordtypes } from './keyword-types/keywordtypes.js';
import { autofillkeysets } from './autofill-keysets/autofillkeysets.js';
import { customqueries } from './custom-queries/customqueries.js';
import { notetypes } from './note-types/notetypes.js';
import { documenttype } from './document-types/documenttype.js';
import { document } from './document/document.js';

export const core = {
    name: "Document Management API",
    endpoint: "/onbase/core",
    filetypes: filetypes,
    documenttypegroups: documenttypegroups,
    documenttypes: documenttypes,
    keywordtypegroups: keywordtypegroups,
    keywordtypes: keywordtypes,
    autofillkeysets: autofillkeysets,
    customqueries: customqueries,
    notetypes: notetypes,
    async getDocument(id:string, getKeywords:boolean, getRevisions:boolean): Promise<any> {
        const data = await document.get(id, getKeywords, getRevisions);
        return data;
    }
}

