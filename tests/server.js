import { stringify } from "querystring";
import { basesloaded } from "../dist/bases.js"; 
import { document } from "../dist/core/document/document.js";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// bases object goe into global scope
const bases = await LoadBases()
console.log("Connected to OnBase API");
const doc = await document.get(149);
await doc.getKeywords();
setTimeout(async () => {
    let json = JSON.stringify(doc);
    console.log(json);
    await bases.disconnect();
}, 2000);

async function LoadBases(){
    console.log("Loading basesjs...");
    const bases = new basesloaded();
    await bases.connect("RESTAPI", "P@ssw0rd");
    return bases;
}
