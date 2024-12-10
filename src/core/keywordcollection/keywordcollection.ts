import { KeywordType } from '../keyword-types/keywordtype.js';
import { KeywordTypeGroup } from '../keyword-type-groups/keywordtypegroup.js';
import { Keyword, NewKeyword } from '../keywords/keyword.js';
import { KeywordValue, NewKeywordValue } from '../keywords/keywordvalue.js';
import { RecordGroup, MultiRecordGroup, NewRecordGroup, NewMultiRecordGroup } from '../keywords/keywordgroup.js';

export interface IKeywordCollection {
    keywordGuid: string;
    Keywords?: NewKeyword[] | Keyword[];
    RecordGroups?: NewRecordGroup[] | RecordGroup[];
    MultiRecordGroups?: NewMultiRecordGroup[] | MultiRecordGroup[];
}

/*TODO: 
 - Figure out how to safely add keywords. 
    - Store the response from the keywordguid call? 
    - Check id's?
     - Do we really need to grab the whole keyword record?
 - Figure out how to initialize a new keyword collection.
 */