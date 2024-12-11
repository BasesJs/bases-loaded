import { KeywordType } from '../keyword-types/keywordtype.js';
import { KeywordTypeGroup } from '../keyword-type-groups/keywordtypegroup.js';
import { Keyword, NewKeyword } from '../keywords/keyword.js';
import { KeywordValue, NewKeywordValue } from '../keywords/keywordvalue.js';
import { RecordGroup, MultiRecordGroup, RecordGroupItem, MultiRecordGroupItem } from '../keywords/keywordgroup.js';
import { KeywordCollection, KeywordCollectionItem } from './keywordcollection.js';

export class ModifyKeywordCollection {
  constructor(keywordGuid: string, items: KeywordCollectionItem[], Keywords: Keyword[] = [], RecordGroups: RecordGroup[] = [], MultiRecordGroups: MultiRecordGroup[] = []) {
    this.keywordGuid = keywordGuid;
    this.items = items;
    this.Keywords = Keywords;
    this.RecordGroups = RecordGroups;
    this.MultiRecordGroups = MultiRecordGroups;
  }
  keywordGuid: string = "";
  Keywords: Keyword[];
  RecordGroups: RecordGroup[];
  MultiRecordGroups: MultiRecordGroup[];
  items: KeywordCollectionItem[];
  static async parseAsync(data: KeywordCollection): Promise<ModifyKeywordCollection> {
    const mkc = new ModifyKeywordCollection(data.keywordGuid, data.items);
    mkc.Keywords = await Promise.all(
      data.items.filter(item => !item.typeGroupId && !item.groupId)
        .flatMap(item => item.keywords)
        .map(async keyword => Keyword.parseAsync(keyword))
    );
    mkc.RecordGroups = await Promise.all(
      data.items.filter(item => item.typeGroupId && !item.groupId)
        .map(async item => await RecordGroup.parseAsync(item as RecordGroupItem))
    );
    data.items.filter(async (item) => {
      if (item.typeGroupId && item.groupId) {
        const mikg = await MultiRecordGroup.parseAsync(item as MultiRecordGroupItem);
        const existingGroup = mkc.MultiRecordGroups.find(grp => grp.typeGroupId === mikg.typeGroupId);
        if (existingGroup) {
          existingGroup.recordgroups.push(mikg.recordgroups[0]);
        } else {
          mkc.MultiRecordGroups.push(mikg);
        }
      }
    });
    return mkc;

  }
}