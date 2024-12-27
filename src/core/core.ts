import { FileTypes } from './file-types/filetypes.js';
import { DocumentTypeGroups } from './document-type-groups/documenttypegroups.js';
import { DocumentTypes } from './document-types/documenttypes.js';
import { KeywordTypeGroups } from './keyword-type-groups/keywordtypegroups.js';
import { KeywordTypes } from './keyword-types/keywordtypes.js';
import { AutofillKeysets } from './autofill-keysets/autofillkeysets.js';
import { CustomQueries } from './custom-queries/customqueries.js';
import { NoteTypes } from './note-types/notetypes.js';
import { CurrencyFormats } from './currency-format/currencyformats.js';

export const core = {
    endpoint: "/onbase/core",
    isHydrated: false,
    autofillkeysets: AutofillKeysets,
    currencyformats: CurrencyFormats,
    customqueries: CustomQueries,
    documenttypegroups: DocumentTypeGroups,
    documenttypes: DocumentTypes,
    filetypes: FileTypes,
    keywordtypegroups: KeywordTypeGroups,
    keywordtypes: KeywordTypes,    
    notetypes: NoteTypes,
    async hydrateCore(resolve?:(message:string)=>any, reject?:(error:any)=>any): Promise<void> {
        core.isHydrated = false;
        //ensure there is a cookie
        await CurrencyFormats.get();        
        await Promise.all([
            FileTypes.get(),
            DocumentTypeGroups.get(),
            DocumentTypes.get(),
            KeywordTypeGroups.get(),
            KeywordTypes.get(),
            AutofillKeysets.get(),
            CustomQueries.get(),
            //CurrencyFormats.get(),
            NoteTypes.get()            
        ]).then(async () => {
            core.isHydrated = true;
            if (resolve) {
                resolve(`Core Status: ${core.isHydrated ? "Hydrated" : "Not Hydrated"}`);                
            }
        })
        .catch((error: any) => {
            if (reject) {
                reject(error);
            }
        });
    },
    // async getDocument(id: string, getKeywords: boolean, getRevisions: boolean): Promise<any> {
    //     const data = await Document.get(id, getKeywords, getRevisions);
    //     return data;
    // }
}

