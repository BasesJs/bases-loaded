
import { DocumentTypeGroups } from "../../dist/core/document-type-groups/documenttypegroups.js";
import { DocumentTypes } from "../../dist/core/document-types/documenttypes.js";
import { KeywordTypes } from "../../dist/core/keyword-types/keywordtypes.js";
export async function AuthTest(){
  console.warn("----Authentication Test----");
  console.log("First Call will provide a session cookie. This is required for all following requests, including disconnection.");
  console.log("The Bases Loaded library will automatically handle the cookie for you.");
  console.log("--For named client licenses, only 2 sessions are allowed, on the third request you'll be out of licenses.");
  console.log("--For Concurrent client licenses, you can quickly eat through all the licenses in your system.");
  console.log("--For Query Metering licenses, you will not be impacted by the number of sessions you have, but it's still messy.");
  let results = await DocumentTypeGroups.get();
  console.info(`Retrieved all document types groups, there are ${results.length} groups in your system.`);
  console.warn("Session cookie is: " + global.bases.cookie);
  let doctypes = await DocumentTypes.get();
  console.info(`Retrieved all document types, there are ${doctypes.length} groups in your system.`);
  console.warn("Session cookie is: " + global.bases.cookie);
  let keywords = await KeywordTypes.get();
  console.info(`Retrieved all keyword types, there are ${keywords.length} groups in your system.`);
  console.warn("Session cookie is: " + global.bases.cookie); 
}