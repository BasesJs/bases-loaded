import { Bases } from "../../dist/bases.js";
import { Identity } from "../../dist/identity/identity.js";
import { Core } from "../../dist/core/core.js";

export async function AuthenticationTest(username, password) {
  //Create You identity object by passing a username and password.
  const identity = await Identity.create(username, password);  
  //Call the connect method to get a token from the Hyland Identity Service.
  await identity.connect();
  console.log(identity.token)
  //Pass the identity object with a token to the bases create method to create a new bases object.
  const bases = await Bases.create(identity, undefined);
  //let keyTypes = await bases.core.keywordtypes.get();
  // console.warn("Keyword Type Count: ", keyTypes.length);
  // //You can also Hydrate the core so that all the configuration items are loaded in the core object, reducing the number of requests you need to make to the Hyland API.
  // //You can also do this through the Core class as it loads all the configuration items.
  await Core.hydrateCore((message)=>{console.log(message, logCurrentTime())}, (error)=>{console.error(error)});
  // console.warn("Document Type Count: ", Core.DocumentTypes.length)
  return bases;
}

function logCurrentTime() {
  const now = new Date();
  const timeString = now.toTimeString().split(' ')[0]; // Extracts time in HH:MM:SS format
  return timeString;
}