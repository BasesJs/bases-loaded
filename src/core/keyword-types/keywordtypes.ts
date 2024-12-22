import { group, _get } from "../baseclass/basegroup.js";
import { KeywordType, KeywordTypeItem } from "./keywordtype.js";

export const KeywordTypes: group = {
  endpoint: "/keyword-types",
  items: [] as KeywordType[],

  async get(searchTerm?: string | number): Promise<KeywordType[]> {
    const response = await _get(this.endpoint, searchTerm);
    this.items = response.data.items.map((item: KeywordTypeItem) => KeywordType.parse(item));
    return this.items;
  }
};