import { group, _get } from "../baseclass/basegroup.js";
import { KeywordType, KeywordTypeItem } from "./keywordtype.js";

export const KeywordTypes: group = {
  endpoint: "/keyword-types",
  items: [] as KeywordType[],

  async get(searchTerm?: string | number): Promise<KeywordType[] | KeywordType> {
    const response = await _get(this.endpoint, searchTerm);
    let returnItems = await Promise.all(response.data.items.map((item: KeywordTypeItem) => KeywordType.parse(item)));
    if(!searchTerm && global.bases.core.isHydrated === false){
        this.items = returnItems;
    }
    return returnItems.length > 1 ? returnItems : returnItems[0];
  }
};