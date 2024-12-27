import { KeywordItem, Keyword } from '../keyword/keyword.js';
import { RecordGroup, MultiRecordGroup, RecordGroupItem } from '../keyword-groups/keywordgroup.js';

export interface KeywordCollection {
  keywordGuid: string;
  items: KeywordCollectionItem[];
}
export interface KeywordCollectionItem {
  keywords: KeywordItem[];
  typeGroupId?: string;
  instanceId?: string;
  groupId?: string;
}

export class KeywordRecordCollection implements KeywordCollection {
  constructor(keywordGuid: string, items: KeywordCollectionItem[]) {
    this.keywordGuid = keywordGuid;
    this.items = items;
  }
  keywordGuid: string = "";;
  items: KeywordCollectionItem[];
  Keywords: Keyword[] = [];
  RecordGroups: RecordGroup[] = [];
  MultiRecordGroups: MultiRecordGroup[] = [];
  static async parse(data: KeywordCollection): Promise<KeywordRecordCollection> {
    const mkc = new KeywordRecordCollection(data.keywordGuid, data.items);
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
    await Promise.all(data.items.filter(item => item.typeGroupId && item.groupId && item.instanceId)
      .map(async (item) => {
        const existingMIKG = mkc.MultiRecordGroups.find(rg => rg.typeGroupId === item.typeGroupId);
        if (existingMIKG) {
          await existingMIKG.add(item as RecordGroupItem);
        }
        else {
          mkc.MultiRecordGroups.push(await MultiRecordGroup.parse(item as RecordGroupItem));
        }
      }));
    return mkc;
  }
}
