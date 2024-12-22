import { KeywordValue, Keyword } from '../keywords/keyword.js';
import { RecordGroup, MultiRecordGroup } from '../keywords/keywordgroup.js';
import { RecordGroupItem, MultiRecordGroupItem } from './keywordcollection.js';
import { KeywordCollection, KeywordCollectionItem, KeywordItem, KeywordValueItem } from './keywordcollection.js';

export class KeywordValueCollection {
  constructor(keywordGuid: string, items: KeywordCollectionItem[], Keywords?: Keyword[], RecordGroups?: RecordGroup[], MultiRecordGroups?: MultiRecordGroup[]) {
    this.keywordGuid = keywordGuid;
    this.items = items;
    this.Keywords = Keywords;
    this.RecordGroups = RecordGroups;
    this.MultiRecordGroups = MultiRecordGroups;
  }
  keywordGuid: string = "";
  Keywords?: Keyword[];
  RecordGroups?: RecordGroup[];
  MultiRecordGroups?: MultiRecordGroup[];
  items: KeywordCollectionItem[];
  static async parse(data: KeywordCollection): Promise<KeywordValueCollection> {
    const mkc = new KeywordValueCollection(data.keywordGuid, data.items);
    mkc.Keywords = await Promise.all(
      data.items.filter(item => !item.typeGroupId && !item.groupId)
        .flatMap(item => item.keywords)
        .map(keyword => Keyword.parse(keyword))
    );
    mkc.RecordGroups = await Promise.all(
      data.items.filter(item => item.typeGroupId && !item.groupId)
        .map(async item => await RecordGroup.parse(item as RecordGroupItem))
    );
    const groups: MultiRecordGroup[] = [];
    await Promise.all(
      data.items.filter(item => item.typeGroupId && item.groupId)
      .map(async (item) => {
        const group = await MultiRecordGroup.parse(item as MultiRecordGroupItem);
        groups.push(group);
      }
    ));    
    mkc.MultiRecordGroups = [];
    groups.forEach(group => {
      if(mkc.MultiRecordGroups){
        const existing = mkc.MultiRecordGroups.find(rg => rg.typeGroupId === group.typeGroupId);
        if(existing){
          group.records.forEach(record => {
            existing.records.push(record);
          });
        }
        else{
          mkc.MultiRecordGroups.push(group);
        }
      }      
    });
    return mkc;
  }
}

