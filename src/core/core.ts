import { FileTypes } from './file-types/filetypes.js';
import { DocumentTypeGroups } from './document-type-groups/documenttypegroups.js';
import { DocumentTypes } from './document-types/documenttypes.js';
import { KeywordTypeGroups } from './keyword-type-groups/keywordtypegroups.js';
import { KeywordTypes } from './keyword-types/keywordtypes.js';
import { AutofillKeysets } from './autofill-keysets/autofillkeysets.js';
import { CustomQueries } from './custom-queries/customqueries.js';
import { NoteTypes } from './note-types/notetypes.js';
import { CurrencyFormats } from './currency-format/currencyformats.js';
import { Storage } from './storage/storage.js';
import { Document } from './document/document.js';
export class Core {    
    static readonly endpoint: string = "/onbase/core"; 
    static isHydrated: boolean = false; 
    static AutofillKeysets: typeof AutofillKeysets = AutofillKeysets;
    static CurrencyFormats: typeof CurrencyFormats = CurrencyFormats;
    static CustomQueries: typeof CustomQueries = CustomQueries;
    static DocumentTypeGroups: typeof DocumentTypeGroups = DocumentTypeGroups;
    static DocumentTypes: typeof DocumentTypes = DocumentTypes;    
    static FileTypes: typeof FileTypes = FileTypes;
    static KeywordTypeGroups: typeof KeywordTypeGroups = KeywordTypeGroups;
    static KeywordTypes: typeof KeywordTypes = KeywordTypes;
    static NoteTypes: typeof NoteTypes = NoteTypes;
    static Storage: Storage = new Storage();
    static async hydrateCore(resolve?: (message: string) => any, reject?: (error: any) => any): Promise<void>{
        Core.isHydrated = false;
        //ensure there is a cookie
        try{    
            new Core();        
            Core.AutofillKeysets.items = await AutofillKeysets.get();
            Core.CurrencyFormats.items = await CurrencyFormats.get();       
            Core.CustomQueries.items = await CustomQueries.get();
            Core.FileTypes.items = await FileTypes.get();
            Core.DocumentTypeGroups.items = await DocumentTypeGroups.get();
            Core.DocumentTypes.items = await DocumentTypes.get();
            Core.KeywordTypeGroups.items = await KeywordTypeGroups.get();
            Core.KeywordTypes.items = await KeywordTypes.get();
            Core.NoteTypes.items = await NoteTypes.get(); 
            Core.isHydrated = true;
            if(resolve){
                resolve(`Core Status: ${Core.isHydrated ? "Hydrated" : "Not Hydrated"}`);
            }            
        }
        catch(error){
            if(reject){
                reject(error);
            }
        }
    }
    static async getDocument(id: string, retrievalOptions?: {
        getKeywords?: boolean,
        unmaskKeywords?: boolean,
        getRevisions?: boolean,
        getNotes?: boolean,
        getHistory?: boolean
    }): Promise<Document> {
        return await Document.get(id, retrievalOptions);
    }
    
}
/*export interface CoreInterface {
    isHydrated: boolean;
    autofillkeysets: typeof AutofillKeysets;
    currencyformats: typeof CurrencyFormats;
    customqueries: typeof CustomQueries;
    documenttypegroups: typeof DocumentTypeGroups;
    documenttypes: typeof DocumentTypes;
    filetypes: typeof FileTypes;
    keywordtypegroups: typeof KeywordTypeGroups;
    keywordtypes: typeof KeywordTypes;
    notetypes: typeof NoteTypes;
    storage: typeof Storage;
    hydrateCore(resolve?: (message: string) => any, reject?: (error: any) => any): Promise<void>;
    getDocument(id: string, retrievalOptions?: {
        getKeywords?: boolean,
        unmaskKeywords?: boolean,
        getRevisions?: boolean,
        getNotes?: boolean,
        getHistory?: boolean
    }): Promise<Document>
}*/