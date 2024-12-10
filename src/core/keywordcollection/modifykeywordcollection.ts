import { KeywordType } from '../keyword-types/keywordtype.js';
import { KeywordTypeGroup } from '../keyword-type-groups/keywordtypegroup.js';
import { Keyword, NewKeyword } from '../keywords/keyword.js';
import { KeywordValue, NewKeywordValue } from '../keywords/keywordvalue.js';
import { RecordGroup, MultiRecordGroup, NewRecordGroup, NewMultiRecordGroup } from '../keywords/keywordgroup.js';
import { IKeywordCollection } from './keywordcollection.js';

export class ModifyKeywordCollection implements IKeywordCollection {
  constructor(keywordGuid: string, Keywords?: Keyword[], RecordGroups?: RecordGroup[], MultiRecordGroups?: MultiRecordGroup[]) {
      this.keywordGuid = keywordGuid;
      this.Keywords = Keywords;
      this.RecordGroups = RecordGroups;
      this.MultiRecordGroups = MultiRecordGroups;
  }
  keywordGuid: string = "";
  Keywords?: Keyword[] = [];
  RecordGroups?: RecordGroup[] = [];
  MultiRecordGroups?: MultiRecordGroup[] = [];    
  static async parse(items: any) {

  }
}