import { BasesLoaded } from "../dist/bases.js";
import { AuthTest } from "./Authentication/Auth-Test.js";
import { AFKSTest } from "./Autofll-Keysets/AFKS-Test.js";
import { CustomQueryTest } from "./Custom-Queries/customquery-test.js";
import { CurrencyFormatTest } from "./Currency-Formats/test-currency-formats.js";
import { GetDocumentTest} from "./Document/test-get-document.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require('dotenv').config();

// const events = require('events');
// events.EventEmitter.defaultMaxListeners = 0;

const bases = await LoadBases();
try {
    await GetDocumentTest("149", "default", "latest", "./");    
    bases.disconnect()
    .then(() => console.log("Disconnected"))
    .catch(e => console.error("Something went wrong while disconnecting", e.message));
}
catch (error) {
    //console.error(error);
}

export async function LoadBases() {
    console.log("Loading basesjs...");
    const bases = new BasesLoaded();
    await bases.connect("RESTAPI", "P@ssw0rd");
    return bases;
}
