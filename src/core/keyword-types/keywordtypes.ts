import { group, _get } from "../baseclass/basegroup.js";
import { KeywordType, KeywordTypeItem } from "./keywordtype.js";

export const KeywordTypes: group = {
  endpoint: "/keyword-types",
  items: [] as KeywordType[],

  async get(searchTerm?: string | number): Promise<KeywordType[]> {
    try {
      const data = await _get(this.endpoint, searchTerm);
      this.items = data.items.map((item: KeywordTypeItem) => KeywordType.parse(item));
      return this.items;
    } catch (error) {
      console.error('Error fetching keyword types:', error);
      return [];
    }
  }
};