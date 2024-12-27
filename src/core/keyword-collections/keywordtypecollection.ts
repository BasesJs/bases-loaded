export class DocumentKeywordTypes implements KeywordTypeCollection{
    keywordOptions: KeywordOptions;
    items: KeywordTypeCollectionItem[];
    constructor(keywordOptions: KeywordOptions, items: KeywordTypeCollectionItem[]) {
        this.keywordOptions = keywordOptions;
        this.items = items;
    }
    static parse(data: KeywordTypeCollection): DocumentKeywordTypes {
        return new DocumentKeywordTypes(data.keywordOptions, data.items);
    }
}

export interface KeywordTypeCollection{
    keywordOptions: KeywordOptions;
    items: KeywordTypeCollectionItem[];
}
export interface KeywordTypeCollectionItem{
    keywordTypes: KeywordTypeItem[];
    id?: string;
}
export interface KeywordOptions{
    readOnlyKeywordTypeIds: string[];
    requiredForArchivalKeywordTypeIds: string[];
    requiredForRetrievalKeywordTypeIds: string[];
}
export interface KeywordTypeItem{
    id: string;
}