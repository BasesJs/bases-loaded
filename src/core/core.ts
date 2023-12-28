import { filetypes } from './file-types/filetypes'
import { documenttypegroups } from './document-type-groups/documenttypegroups';
import { documenttypes } from './document-types/documenttypes';
import { keywordtypegroups } from './keyword-type-groups/keywordtypegroups';
import { keywordtypes } from './keyword-types/keywordtypes';
import { autofillkeysets } from './autofill-keysets/autofillkeysets';
import { customqueries } from './custom-queries/customqueries';
import { notetypes } from './note-types/notetypes';

export const core = {
    name: "Document Management API",
    endpoint: "/onbase/core",
    filetypes: new filetypes(),
    documenttypegroups: new documenttypegroups(),
    documenttypes: new documenttypes(),
    keywordtypegroups: new keywordtypegroups(),
    keywordtypes: new keywordtypes(),
    autofillkeysets: new autofillkeysets(),
    customqueries: new customqueries(),
    notetypes: new notetypes()  
}

