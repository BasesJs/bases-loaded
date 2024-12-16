import { AutofillKeysets } from "../../dist/core/autofill-keysets/autofillkeysets.js";
import { AutofillKeyset } from "../../dist/core/autofill-keysets/autofillkeyset.js";
export async function AFKSTest(keysetId, primaryValue){
  console.warn("----Autofill Keyset Test----");
  let results = await AutofillKeysets.get();
  console.info(`Retrieved all autofill keysets, there are ${results.length} keysets in your system.`);
  let afks = await AutofillKeyset.get(keysetId);
  console.info(`Retrieved autofill keyset with id ${afks.id}`);
  let keywordTypes = await afks.getKeywordTypes();
  console.info(`Keyword types for keyset ${afks.id} are:`);
  keywordTypes.forEach(kw => {
    console.info(`Keyword type ${kw.id}`);
  });
  let afresult = await afks.getData(primaryValue);
  afresult.forEach(item => {
    console.info(`id: ${item.id}`);
    item.keywords.forEach(kw => {
      console.info(`Keyword ${kw.typeId}: ${kw.value}`);
    });
  });
  console.warn("----End of Autofill Keyset Test----");
}