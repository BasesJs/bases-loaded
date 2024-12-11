import { KeywordItem } from '../keywords/keyword.js';

export interface DefaultKeywordCollection {
    keywordGuid: string;
    items : DefaultKeywordCollectionItem[];
}
export interface KeywordCollection {
    keywordGuid: string;
    items: KeywordCollectionItem[];
} 
export interface DefaultKeywordCollectionItem {
    keywords: KeywordItem[];
    typeGroupId?: string;    
    instanceId?: string;
}
export interface KeywordCollectionItem {  
    keywords: KeywordItem[];
    typeGroupId?: string;    
    instanceId?: string;  
    groupId?: string;
}

