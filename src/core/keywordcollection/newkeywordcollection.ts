import { NewKeyword, KeywordItem } from '../keywords/keyword.js';
import { NewRecordGroupItem, NewMultiRecordGroupItem, NewRecordGroup, NewMultiRecordGroup } from '../keywords/keywordgroup.js';
import { DefaultKeywordCollection, DefaultKeywordCollectionItem } from './keywordcollection.js';


export class NewKeywordCollection implements DefaultKeywordCollection {
    keywordGuid: string;
    Keywords: KeywordItem[];
    RecordGroups: NewRecordGroupItem[];
    MultiRecordGroups: NewRecordGroupItem[];
    items: DefaultKeywordCollectionItem[];

    constructor(keywordGuid: string, items: DefaultKeywordCollectionItem[], Keywords: NewKeyword[] = [], RecordGroups: NewRecordGroupItem[] = [], MultiRecordGroups: NewMultiRecordGroupItem[] = []) {
        this.keywordGuid = keywordGuid;
        this.Keywords = Keywords;
        this.RecordGroups = RecordGroups;
        this.MultiRecordGroups = MultiRecordGroups;
        this.items = items;
    }
    addKeyword(keyword: KeywordItem): void {
        let newKeyword = NewKeyword.parse(keyword);
        const kws = this.items.filter(item => item.typeGroupId === undefined && item.instanceId === undefined)[0];
        const foundItem = kws.keywords.find(it => it.typeId === newKeyword.typeId);
        if (!foundItem) {
            throw new Error("Keyword does not exist in the default keyword collection so it cannot be added.");
        }
        this.Keywords.push(newKeyword);
    }
    addKeywordGroup(keywordGroup: NewRecordGroupItem): void {
        const existingKeywordGroup = this.RecordGroups.find(rg => rg.typeGroupId === keywordGroup.typeGroupId);
        if (existingKeywordGroup) {
            existingKeywordGroup.keywords = keywordGroup.keywords;
            return;
        }
        throw new Error("KeywordGroup does not exist in the collection.");
    }
    addMultiKeywordGroup(multiKeywordGroup: NewMultiRecordGroupItem): void {
        const existingMultiKeywordGroup = this.MultiRecordGroups.find(rg => rg.typeGroupId === multiKeywordGroup.typeGroupId);
        if (existingMultiKeywordGroup) {
            existingMultiKeywordGroup.keywords = multiKeywordGroup.keywords;
            return;
        }
        throw new Error("MultiKeywordGroup does not exist in the collection.");
    }
    static parse(data: DefaultKeywordCollection): NewKeywordCollection {
        const nkc = new NewKeywordCollection(data.keywordGuid, data.items);
        const keys = data.items.filter(item => item.typeGroupId === undefined && item.instanceId === undefined);
        keys.forEach(item => {
            item.keywords.forEach((k: any) => {
                const kw: NewKeyword = NewKeyword.parse(k);
                nkc.Keywords.push(kw);
            });
        });
        const sikgs = data.items.filter(item => item.typeGroupId !== undefined && item.instanceId === undefined) as NewRecordGroupItem[];
        sikgs.forEach(item => {
            const sikg = NewRecordGroup.parse(item);
            nkc.RecordGroups.push(sikg);
        });

        const mikgs = data.items.filter(item => item.typeGroupId !== undefined && item.instanceId !== undefined) as NewMultiRecordGroupItem[];
        mikgs.forEach(item => {
            const mikg: NewMultiRecordGroup = NewMultiRecordGroup.parse(item);
            nkc.MultiRecordGroups.push(mikg);
        });

        return nkc;
    }
}
