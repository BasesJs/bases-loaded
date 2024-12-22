//Represents the Entire Keyword Collection
export interface KeywordCollection {
    keywordGuid: string;
    items: KeywordCollectionItem[];
}
/*----------------------POSIBLE ITEMS IN KEYWORD COLLECTION------------------------*/
//Represents a generic item in the Keyword Collection
export interface KeywordCollectionItem {
    keywords: KeywordItem[];
    typeGroupId?: string;
    instanceId?: string;
    groupId?: string;
}
//Represents more specficly the Single Instance Keyword Group Record
export interface RecordGroupItem extends KeywordCollectionItem {
    typeGroupId: string;
    keywords: KeywordItem[];
    groupId?: string;
    instanceId?: string;
}
//Represents more specficly the Multiple Instance Keyword Group Record
export interface MultiRecordGroupItem extends KeywordCollectionItem {
    typeGroupId: string;
    keywords: KeywordItem[];
    groupId: string;
    instanceId: string;
}
/*-----------------------------------------------------------------------------------*/
//Represent a Keyword Record
export interface KeywordItem {
    typeId: string;
    values?: KeywordValueItem[];
}
//Represents a Keyword Value
export interface KeywordValueItem  {
    formattedValue?: string;
    value: string;
}
