
import { DocumentTypeGroups } from "../../dist/core/document-type-groups/documenttypegroups.js";
import { DocumentTypes } from "../../dist/core/document-types/documenttypes.js";
import { KeywordTypes } from "../../dist/core/keyword-types/keywordtypes.js";
export async function AuthTest(bases){
  console.warn("----Authentication Test----");
  console.log("First Call will provide a session cookie. This is required for all following requests, including disconnection.");
  console.log("The Bases Loaded library will automatically handle the cookie for you.");
  console.log("--For named client licenses, only 2 sessions are allowed, on the third request you'll be out of licenses.");
  console.log("--For Concurrent client licenses, you can quickly eat through all the licenses in your system.");
  console.log("--For Query Metering licenses, you will not be impacted by the number of sessions you have, but it's still messy.");
  let results = await DocumentTypeGroups.get();
  console.info(`Retrieved all document types groups, there are ${results.length} groups in your system.`);
  console.warn("Session cookie is: " + global.bases.cookie);
  console.log("We can also hydrate the core, which will fetch all the core objects from the server.");  
  await bases.core.hydrateCore(resolve, reject);
  console.log("Autofill Keysets Count: ", bases.core.autofillkeysets.items.length);
  console.log("Currency Format Count: ", bases.core.currencyformats.items.length);
  console.log("Custom Queries Count: ", bases.core.customqueries.items.length);
  console.log("Document Type Groups Count: ", bases.core.documenttypegroups.items.length);
  console.log("Document Types Count: ", bases.core.documenttypes.items.length);
  console.log("File Types Count: ", bases.core.filetypes.items.length);
  console.log("Keyword Type Groups Count: ", bases.core.keywordtypegroups.items.length);
  console.log("Keyword Types Count: ", bases.core.keywordtypes.items.length);
  console.log("Note Types Count: ", bases.core.notetypes.items.length);
}

function resolve(message) {
  console.log(message);
}
function reject(error) {
  console.error(error);
}