//Default Keyword Response Types

//Represents a Keyword Value
export interface KeywordValueItem {
    formattedValue?: string;
    value: string;
}
//Represent a Keyword Record
export interface KeywordItem {
    typeId: string;
    values?: KeywordValueItem[];
}
//Represents one of the "items" in a keyword response
export interface KeywordCollectionItem {
    keywords: KeywordItem[];
    typeGroupId?: string;
    instanceId?: string;
    groupId?: string;
}
export interface RecordGroupItem extends KeywordCollectionItem {
    typeGroupId: string;
    keywords: KeywordItem[];
    groupId?: string;
    instanceId?: string;
}
export interface MultiRecordGroupItem extends KeywordCollectionItem {
    typeGroupId: string;
    keywords: KeywordItem[];
    groupId: string;
    instanceId: string;
}
//Represents the Entire Keyword Collection
export interface KeywordCollection {
    keywordGuid: string;
    items: KeywordCollectionItem[];
}

//NEW Keyword Records & Value
export interface NewRecordGroupItem extends KeywordCollectionItem {
    typeGroupId?: string;
    keywords: KeywordItem[];
}
export interface NewMultiRecordGroupItem extends KeywordCollectionItem {
    typeGroupId?: string;
    keywords: KeywordItem[];
    instanceId: string;
}