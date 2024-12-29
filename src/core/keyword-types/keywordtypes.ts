import { group, _get } from "../baseclass/basegroup.js";
import { KeywordType, KeywordTypeItem } from "./keywordtype.js";

export const KeywordTypes: group = {
  endpoint: "/keyword-types",
  items: [] as KeywordType[],

  async get(searchTerm?: string | number): Promise<KeywordType[] | KeywordType> {
    const response = await _get(this.endpoint, searchTerm);
    let returnItems: KeywordType[] = [];
    await response.data.items.forEach(async (item: KeywordTypeItem) => {
      returnItems.push(await KeywordType.parse(item))
    });
    return returnItems.length > 1 ? returnItems : returnItems[0];
  }
};