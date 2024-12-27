import { KeywordItem } from '../../keyword/keyword.js';
import { KeywordCollectionItem } from '../keywordcollections.js';

export async function AddKeyword(item: KeywordCollectionItem, keyword: KeywordItem, index?: number): Promise<void> {
    const kw = await Promise.all(item.keywords.filter(async (it) => {
        if (it.typeId === keyword.typeId) {
            keyword.values?.forEach(value => {
                it.values?.splice(index ?? 0, 0, value);
                if (index !== undefined)
                    index++;
            });
            return true;
        }
    }));
    if (!kw) {
        throw new Error("Keyword does not exist in the keyword collection so it cannot be added.");
    }
}

export async function UpdateKeyword(item: KeywordCollectionItem, oldKeywordValue: string, newKeyword: KeywordItem): Promise<void> {
    const existingKeys = await Promise.all(item.keywords.filter(async (it) => {
        if (it.typeId === newKeyword.typeId) {
            let index = await DeleteKeyword(item, newKeyword.typeId, oldKeywordValue) ?? 0;
            await AddKeyword(item, newKeyword, index);
        }
    }));
    if (!existingKeys) {
        throw new Error("Keyword does not exist in the keyword collection so it cannot be updated.");
    }
}
export async function DeleteKeyword(item: KeywordCollectionItem, typeId: string, specificValue?: string): Promise<number | undefined> {
    let index: number | undefined = 0;
    const existingKeys = await Promise.all(item.keywords.filter(async (it) => {
        if (it.typeId === typeId) {
            if (it.values !== undefined) {
                if (specificValue === undefined) {
                    it.values = [];
                }
                else {
                    const values = await Promise.all(it.values.filter(async (value) => {
                        if (value.value === specificValue) {
                            index = it.values?.indexOf(value);
                            if (index !== undefined) {
                                it.values?.splice(index, 1)
                            }
                        }
                    }));
                    if (!values) {
                        console.warn("Keyword value doesn't exist, adding anyway.");
                        index = 0;
                    }
                }
            }
        }
    }));
    if (!existingKeys) {
        throw new Error("No keywords of this type were found in the keyword collection so it cannot be deleted.");
    }
    return index;
}