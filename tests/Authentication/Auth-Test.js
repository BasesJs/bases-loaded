import { BasesLoaded } from "../../dist/bases.js";
import { Identity } from "../../dist/identity/identity.js";
export async function LoadBases(username, password) {
  const identity = Identity.create(username, password);
  const token = await identity.connect();
  //console.log("Authentication Token Recieved: ", token);
  const bases = new BasesLoaded(identity);
  console.log("Hydrating Core Starting...", logCurrentTime());
  await bases.core.hydrateCore((message)=>{console.log(message, logCurrentTime())}, (error)=>{console.error(error)});
  console.warn("Document Type Count: ", bases.core.documenttypegroups.items.length);
  return bases;
}

function logCurrentTime() {
  const now = new Date();
  const timeString = now.toTimeString().split(' ')[0]; // Extracts time in HH:MM:SS format
  return timeString;
}