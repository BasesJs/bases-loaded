import { NewKeyword } from '../keywords/keyword.js';
import { NewRecordGroup, NewMultiRecordGroup } from '../keywords/keywordgroup.js';
import { IKeywordCollection } from './keywordcollection.js';

export class NewKeywordCollection implements IKeywordCollection {
    keywordGuid: string;
    Keywords: NewKeyword[];
    RecordGroups: NewRecordGroup[];
    MultiRecordGroups: NewMultiRecordGroup[];

    constructor(keywordGuid: string, Keywords: NewKeyword[] = [], RecordGroups: NewRecordGroup[] = [], MultiRecordGroups: NewMultiRecordGroup[] = []) {
        this.keywordGuid = keywordGuid;
        this.Keywords = Keywords;
        this.RecordGroups = RecordGroups;
        this.MultiRecordGroups = MultiRecordGroups;
    }

    addKeyword(keyword: NewKeyword): void {
        const existingKeyword = this.Keywords.find(kw => kw.id === keyword.id);
        if (existingKeyword) {
            existingKeyword.values = keyword.values;
            return;
        }
        throw new Error("Keyword does not exist in the collection.");
    }

    addKeywordGroup(keywordGroup: NewRecordGroup): void {
        const existingKeywordGroup = this.RecordGroups.find(rg => rg.typeGroupId === keywordGroup.typeGroupId);
        if (existingKeywordGroup) {
            existingKeywordGroup.keywords = keywordGroup.keywords;
            return;
        }
        throw new Error("KeywordGroup does not exist in the collection.");
    }

    addMultiKeywordGroup(multiKeywordGroup: NewMultiRecordGroup): void {
        const existingMultiKeywordGroup = this.MultiRecordGroups.find(rg => rg.typeGroupId === multiKeywordGroup.typeGroupId);
        if (existingMultiKeywordGroup) {
            existingMultiKeywordGroup.keywords = multiKeywordGroup.keywords;
            return;
        }
        throw new Error("MultiKeywordGroup does not exist in the collection.");
    }

    static parse(data: { keywordGuid: string; items: any[] }): NewKeywordCollection {
        const nkc = new NewKeywordCollection(data.keywordGuid);
        const keys = data.items.filter(item => item.typeGroupId === undefined && item.instanceId === undefined);

        keys.forEach(item => {
            item.keywords.forEach((k: any) => {
                const kw: NewKeyword = NewKeyword.parse(k);
                nkc.Keywords.push(kw);
            });
        });

        const sikgs = data.items.filter(item => item.typeGroupId !== undefined && item.instanceId === undefined);
        sikgs.forEach(item => {
            const sikg = NewRecordGroup.parse(item);
            nkc.RecordGroups.push(sikg);
        });

        const mikgs = data.items.filter(item => item.typeGroupId !== undefined && item.instanceId !== undefined);
        mikgs.forEach(item => {
            const mikg = NewMultiRecordGroup.parse(item);
            nkc.MultiRecordGroups.push(mikg);
        });

        return nkc;
    }
}