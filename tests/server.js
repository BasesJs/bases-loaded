import { BasesLoaded } from "../dist/bases.js";
import { AuthTest } from "./Authentication/Auth-Test.js";
import { AFKSTest } from "./Autofll-Keysets/AFKS-Test.js";
import { CustomQueryTest } from "./Custom-Queries/customquery-test.js";
import { TestCurrencyFormat } from "./Currency-Formats/test-currency-formats.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require('dotenv').config();

const bases = await LoadBases();

try {
    //await AuthTest();
    //await AFKSTest("117", "INV-34-5056");
    //await CustomQueryTest();
    await TestCurrencyFormat();

}
catch (e) {
    console.error(e.message);
}
finally {
    bases.disconnect()
        .catch(e => console.error("Something went wrong while disconnecting", e.message));
}

/*----CALL THIS FUNCTION TO LOGIN----------*/
export async function LoadBases() {
    console.log("Loading basesjs...");
    const bases = new BasesLoaded();
    await bases.connect("RESTAPI", "P@ssw0rd");
    return bases;
}

